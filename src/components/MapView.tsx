import { useContext, useLayoutEffect, useRef } from 'react';

import { Map } from 'maplibre-gl';

import { PlacesContext } from '../context/places/PlacesContext';
import { Loading } from './Loading';
import { MapContext } from '../context/map/MapContext';

export const MapView = () => {

  const { isLoading, userLocation } = useContext( PlacesContext );
  const { setMap } = useContext( MapContext );
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if ( !isLoading ) {
      const map = new Map({
        container: mapDiv.current!, // container id
        style: 'https://api.maptiler.com/maps/streets-v2/style.json?key=fGVeXadGDA8EWesOVAmx', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 6 // starting zoom
      });

      setMap( map );
    }
  
  }, [ isLoading ])


  if ( isLoading ) {
    return ( <Loading  /> ) 
  }

  return (
    <div ref={ mapDiv }
      style={{
        backgroundColor: 'red',
        height: '100vh',
        left: '0',
        position: 'fixed',
        top: '0',
        width: '100vw',
      }}
    >
      { userLocation?.join(',')}
    </div>
  )
}