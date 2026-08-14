import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { useSearchHero } from "@/heroes/hooks/useSearchHero";
import { useSearchParams } from "react-router";
import { SearchControls } from "./ui/SearchControls";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") ?? undefined;
  const strength = searchParams.get("strength") ?? undefined;

  // * Debido a que el componente de SearchControls modifica la query con los parametro de busqueda, este componente nutrira con lo datos de la query usando tanstackquery
  const { data: searchHeroes = [] } = useSearchHero({ name, strength });
  // console.log({ searchHeroes });
  return (
    <>
      {/* Header */}
      <CustomJumbotrom
        title="Superhero Universe"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />
      {/* CustomBreadcrumbs */}
      <CustomBreadcrumbs
        currentPage="Buscador de Heroes"
        // breadcrumbs={[
        //   { label: "Home1", to: "/" },
        //   { label: "Home2", to: "/" },
        //   { label: "Home3", to: "/" },
        // ]}
      />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Controls */}
      <SearchControls />
      {/* Hero Grid */}
      <HeroGrid heroes={searchHeroes} />
    </>
  );
};

export default SearchPage;
