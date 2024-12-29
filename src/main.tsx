import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MapsApp } from './MapsApp.tsx';

import 'maplibre-gl/dist/maplibre-gl.css';

if ( !navigator.geolocation ) {
  alert( 'Tu navegador no tiene opción de Geolocation');
  throw new Error( 'Tu navegador no tiene opción de Geolocation');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MapsApp />
  </StrictMode>,
)
