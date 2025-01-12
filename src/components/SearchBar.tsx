import { useContext, useRef } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { SearchResults } from './SearchResults';


export const SearchBar = () => {

  const { searchPlacesByTerm } = useContext( PlacesContext );

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const onQueryChanged = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    if ( debounceRef.current ) clearTimeout( debounceRef.current );

    debounceRef.current = setTimeout(() => {
      // TODO
      searchPlacesByTerm( event.target.value );
    }, 500);
  }


  return (
    <div className="search-container">
      <input 
        type="text" 
        className="form-control"
        placeholder="Buscar lugar... "
        onChange={ onQueryChanged }
      />

      <SearchResults />
    </div>
  )
}