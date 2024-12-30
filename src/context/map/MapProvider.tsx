import { LngLatBounds, Map, Marker, Popup, SourceSpecification } from 'maplibre-gl';
import { MapContext } from './MapContext';
import { useContext, useEffect, useReducer } from 'react';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../places/PlacesContext';
import directionsApi from '../../apis/directionsApi';
import type { DirectionsResponse } from '../../interfaces/directions';


export interface MapState {
  isMapReady: boolean;
  map?: Map;
  makers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  makers: [],
}

interface Props {
  children: JSX.Element | JSX.Element[]
}
export const MapProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer( mapReducer, INITIAL_STATE );
  const { places } = useContext( PlacesContext );

  useEffect(() => {
    state.makers.forEach( marker => marker.remove() );
    const newMarkers: Marker[] = [];

    for ( const place of places ) {
      const [ lng, lat ] = place.center;
      const popup = new Popup()
              .setHTML(`
                  <h6>${ place.text }</h6>
                  <p>${ place.place_name }</p>
                `);

      const newMarker = new Marker()
              .setPopup( popup )
              .setLngLat([lng, lat])
              .addTo( state.map! );

      newMarkers.push( newMarker );
    }

    dispatch({ type: 'setMarkers', payload: newMarkers })

  
  }, [ places ]);
  

  const setMap = ( map: Map ) => {

    const myLocationPopup = new Popup()
        .setHTML(`
            <h4>Aquí estoy</h4>
            <p>En algún lugar del mundo</p>
          `);

    new Marker({
      color: '#61DAFB'
    })
          .setLngLat( map.getCenter() )
          .setPopup( myLocationPopup )
          .addTo( map );

    dispatch({ type: 'setMap', payload: map })
  };

  const getRouteBetweenPoints = async( start: [number, number], end: [number, number]) => {
   
    const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
    const { distance, duration, legs } = resp.data.routes[0];
    const coordinates = legs.flatMap(leg =>
      leg.steps.flatMap(step => step.geometry.coordinates)
    );

    let kms = distance / 1000;
        kms = Math.round( kms * 100 );
        kms /= 100;

    const minutes = Math.floor( duration / 60 );
    console.log({ kms, minutes });

    const bounds = new LngLatBounds(
      start,
      start
    );

    for (const coordinate of coordinates) {
      const newCoord: [number, number] = [ coordinate[0], coordinate[1]];
      bounds.extend( newCoord );
    };

    state.map?.fitBounds( bounds, {
      padding: 200
    } );

    // Polyline
    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coordinates
            }
          }
        ]
      }
    }

    if ( state.map?.getLayer('RouteString') ) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData );

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3,
      }
    });

  };

  return (
    <MapContext.Provider value={{
      ...state,
      setMap,
      getRouteBetweenPoints
    }}>
      { children }
    </MapContext.Provider>
  )
}