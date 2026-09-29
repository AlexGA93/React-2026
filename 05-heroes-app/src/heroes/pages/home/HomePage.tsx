import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { HeroStats } from "@/heroes/components/HeroStats";
import { FavoriteHeroContext } from "@/heroes/context/FavoriteHeroContext";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";
import { useQueryParameters } from "@/heroes/hooks/useQueryParameters";
import { Heart } from "lucide-react";
import { use } from "react";

// type ActiveTabsType = "all" | "favorites" | "heroes" | "villains";
export const HomePage = () => {
  // * cosumimos el contexto mediante useCcontext ( o use() para versiones superiores)
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  const { page, limit, category, selectedTab, setSearchParams } =
    useQueryParameters();

  const handleSearchParams = (section: string, category: string = "all") => {
    setSearchParams((prev) => {
      prev.set("tab", section);
      prev.set("category", category);
      prev.set("page", "1");
      // devolvemos el valor
      return prev;
    });
  };

  // const [activeTab, setActiveTab] = useState<ActiveTabsType>("all");
  // ! No es recomendable usar esto porque en cada recarga del componente vamos a disparar el efectoi haciendo la/s peticion/es que ponga.
  // useEffect(() => {
  //   getHeroApiByPage().then((heroes) => {
  //     console.log({ heroes });
  //   });
  // }, []);
  // * SOLUCION: TANSTACK QUERY
  const { data: heroesResponse } = usePaginatedHero({
    page: +page,
    limit: +limit,
    category,
  });

  // accedemos al contenido de la peticion axios a /summary estrictamente tipada
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotrom
          title="Superhero Universe"
          description="Discover, explore, and manage your favorite superheroes and villains"
        />

        {/* Breadcrumbs */}
        <CustomBreadcrumbs currentPage="Heroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="my-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() => handleSearchParams("all")}
              className="cursor-pointer"
            >
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() => handleSearchParams("favorites")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Heart className="h-4 w-4" />
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger
              value="heroes"
              onClick={() => handleSearchParams("heroes", "hero")}
              className="cursor-pointer"
            >
              Heroes ({summary?.heroCount})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => handleSearchParams("villains", "villain")}
              className="cursor-pointer"
            >
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>
          {/* Contenido de todos */}
          <TabsContent value="all">
            {/* Mostrar todos los personajes*/}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          {/* Contenido de favoritos */}
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos  */}
            <HeroGrid heroes={favorites} />
          </TabsContent>
          {/* Heroes */}
          <TabsContent value="heroes">
            {/* Mostrar todos los heroes */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          {/* Villains */}
          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>
        {selectedTab !== "favorites" && (
          <>
            {/* Pagination - Buscamos paginar la url, no los heroes*/}
            <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
          </>
        )}
      </>
    </>
  );
};

export default HomePage;
