import axios from 'axios';



const directionsApi = axios.create({
  baseURL: 'http://router.project-osrm.org/route/v1/driving',
  params: {
    overview: false,
    steps: true,
    geometries: 'geojson'
  }
});


export default directionsApi;