import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducer } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';
import searchApi from '../../apis/searchApi';
import type { Feature, PlaceResponse } from '../../interfaces/places';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [ number, number ];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITILA_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
}

interface Props {
  children: JSX.Element;
}

export const PlacesProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(placesReducer, INITILA_STATE);

  useEffect(() => {
    getUserLocation()
      .then( lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }) );
  }, []);

  const searchPlacesByTerm = async( query: string ): Promise<Feature[]> => {
    if ( query.length === 0 ) {
      dispatch({ type: 'setPlaces', payload: [] });
      return []
    };
    
    if ( !state.userLocation ) throw new Error('No hay ubicación del usuario');

    dispatch({ type: 'setLoadingPlaces' })

    const resp = await searchApi.get<PlaceResponse>(`${ query }.json`, {
      params: {  
        proximity: state.userLocation.join(','),
        key: 'fGVeXadGDA8EWesOVAmx'
      }
    });

    dispatch({ type: 'setPlaces', payload: resp.data.features });
    return resp.data.features;
  }
  


  return (
    <PlacesContext.Provider value={{
      ...state,

      //Methods
      searchPlacesByTerm,
    }}>
      { children }
    </PlacesContext.Provider>
  )
}