import axios from 'axios';


const searchApi = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
  params: {
    format: 'json',
    limit: 5,
    countryCodes: 'sv',
    addressdetails: 1,
    namedetails: 1,
    polygon_geojson: 1,
  }
});


export default searchApi;