import { useContext } from 'react';
import { MapContext } from '../context/map/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';

export const BtnMyLocation = () => {

  const { map, isMapReady } = useContext( MapContext );
  const { userLocation } = useContext( PlacesContext );

  const onClick = () => {
   if ( !isMapReady ) throw new Error('Mapa no está listo');
   if ( !userLocation ) throw new Error('No hay ubicación de usuario');

   map?.flyTo({
    zoom: 14,
    center: userLocation
   })
  }

  return (
    <button 
      className="btn btn-primary"
      style={{
        position: 'fixed',
        right: '20px',
        top: '20px',
        zIndex: 999
      }}
      onClick={ onClick }
    >
      Mi Ubicación
    </button>

  )
}