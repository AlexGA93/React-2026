import { Loader } from "@/components/custom/Loader";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Users, Zap } from "lucide-react";
import { use, useMemo } from "react";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";
import { useHeroSummary } from "../hooks/useHeroSummary";
import { HeroStatCard } from "./HeroStatCard";

export const HeroStats = () => {
  // * cosumimos el contexto mediante useCcontext ( o use() para versiones superiores)
  const { favoriteCount } = use(FavoriteHeroContext);
  // accedemos al contenido de la peticion axios a /summary estrictamente tipada
  const { data: summary } = useHeroSummary();

  const handleFavoritesPercentage = useMemo(() => {
    if (!summary || favoriteCount === 0) return 0;

    return ((favoriteCount / summary.totalHeroes) * 100).toFixed(2);
  }, [favoriteCount]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {/* TOTAL CHARACTERS */}
      <HeroStatCard
        title="Total Characters"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      >
        {/* childs */}
        <div className="text-2xl font-bold">{summary?.totalHeroes}</div>
        <div className="flex gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">
            {summary?.heroCount} Heroes
          </Badge>
          <Badge variant="destructive" className="text-xs">
            {summary?.villainCount} Villains
          </Badge>
        </div>
      </HeroStatCard>

      {/* FAVORITES  */}
      <HeroStatCard
        title="Favorites"
        icon={<Heart className="h-4 w-4 text-muted-foreground" />}
      >
        {!summary ? (
          <Loader />
        ) : (
          <>
            {/* childs */}
            <div className="text-2xl font-bold text-red-600">
              {favoriteCount}
            </div>
            <p className="text-xs text-muted-foreground">
              {handleFavoritesPercentage}% of total
            </p>
          </>
        )}
      </HeroStatCard>

      {/* STRONGEST */}
      <HeroStatCard
        title="Strongest"
        icon={<Zap className="h-4 w-4 text-muted-foreground" />}
      >
        {/* childs */}
        <div className="text-lg font-bold">{summary?.strongestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Strength: {summary?.strongestHero.strength}/10
        </p>
      </HeroStatCard>

      {/* INTELIGENCE */}
      <HeroStatCard
        title="Inteligence"
        icon={<Brain className="h-4 w-4 text-muted-foreground" />}
      >
        {/* childs */}
        <div className="text-lg font-bold">{summary?.smartestHero.alias}</div>
        <p className="text-xs text-muted-foreground">
          Inteligence: {summary?.smartestHero.intelligence}/10
        </p>
      </HeroStatCard>
    </div>
  );
};
