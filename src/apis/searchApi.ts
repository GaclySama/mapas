import axios from 'axios';


const searchApi = axios.create({
  baseURL: 'https://api.maptiler.com/geocoding',
  params: {
    types: 'place',
    autocomplete: 'false',
    fuzzyMatch: 'true',
    limit: 5,
  }
});


export default searchApi;