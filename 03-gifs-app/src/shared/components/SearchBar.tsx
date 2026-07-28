import { useEffect, useState, type FC } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string)=> void
}

export const SearchBar: FC<Props> = ({ placeholder = "Buscar", onQuery }) => {
  
  // * 1- definimos el estado local que almacenara el valor del input
  const [query, setQuery] = useState<string>('');

  // * 2- asignamos el valor del input el estado local y asignamos a cualqueir cambio la funcion del estado para actualizarlo
  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  // * 3- al pulsar el boton recogemos el valor del estado local y lo mandamos por props al padre
  const handleSearch = () => {
    // enviamos al padre la informacion de busqueda
    onQuery(query);
    // actualizamos la busqueda reseteandola
    setQuery('');
  }

  // * 4- Efecto del componente para que con cualquier cambio en el estado se envie automaticamente al padre la info
  useEffect(
    () => {
      // * 4.1- definimos un timeout para que cada vez que se accione el efecto seespere unos ms antes de efectuar la funcion
      const timeout = setTimeout(() => {
        // Enviamos el valro al padre
        onQuery(query);
      }, 700);
      
      // accion adicional: funcion de limpieza cuando el componente deja de existir
      return () => {
        // console.log("funcion de limpieza");
        // limpiamos el timeout
        clearTimeout(timeout);
      }
    },
    [query, onQuery]
  );

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        // * 2
        value={query}
        onChange={(event) => handleSetQuery(event)}
        // * 3 (si se pulsa el enter en el input)
        onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
      />
      <button
        // * 3
        onClick={handleSearch}
      >Buscar</button>
    </div>
  )
}
