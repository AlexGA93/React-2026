import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { GifList } from "./gifs/components/GifList";
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {

  // usamos custom hook que gestiona la logica global de la seccion
  const { previousTerms, gifs, handleTermClicked, handleSearch } = useGifs();

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y Comparte el Gif perfecto"
      />
      {/* Search */}
      <SearchBar placeholder="Buscar Gifs" onQuery={handleSearch} />

      {/* History */}
      <PreviousSearches searches={previousTerms} onLabelClick={handleTermClicked} />

      {/* Gifs */}
        <GifList gifs={gifs} />
    </>
  );
};
