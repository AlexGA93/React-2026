import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Brain, Eye, Gauge, Heart, Shield, Zap } from "lucide-react";
import { use } from "react";
import { useNavigate } from "react-router";
import { FavoriteHeroContext } from "../context/FavoriteHeroContext";
import type { Hero } from "../types/hero.interface";

interface Props {
  hero: Hero;
}

export const HeroGridCard = ({ hero }: Props) => {
  const navigate = useNavigate();
  // * cosumimos el contexto mediante useCcontext ( o use() para versiones superiores)
  const { isFavorite, toggleFavorite } = use(FavoriteHeroContext);
  // console.log({ data: isFavorite(hero) });
  const handleClick = (heroSlug: string) => {
    navigate(`/hero/${heroSlug}`);
  };

  const handleClass = (heroCategory: string) =>
    heroCategory === "Hero"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-linear-to-br from-white to-gray-50">
      <div className="relative h-64">
        <img
          src={hero.image}
          alt={hero.name}
          loading="lazy"
          className="object-cover transition-all duration-500 group-hover:scale-110 absolute -top-10 w-full h-[410px] cursor-pointer"
          onClick={() => handleClick(hero.slug)}
        />

        {/* Status indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              hero.status === "active" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <Badge
            variant="secondary"
            className="text-xs bg-white/90 text-gray-700"
          >
            {hero.status}
          </Badge>
        </div>

        {/* Universe badge */}
        <Badge
          className={`absolute top-3 right-3 text-xs ${
            hero.universe === "DC" ? "bg-blue-600" : "bg-red-600"
          } text-white`}
        >
          {hero.universe}
        </Badge>

        {/* Favorite button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-white"
          onClick={() => toggleFavorite(hero)}
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite(hero)
                ? "fill-red-500 text-red-500"
                : "fill-gray-500 text-gray-500"
            }`}
          />
        </Button>

        {/* View details button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 left-3 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="h-4 w-4 text-gray-600" />
        </Button>
      </div>

      <CardHeader className="py-3 z-10 bg-gray-100/50 backdrop-blur-sm relative top-1 group-hover:top-[-10px] transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight">{hero.alias}</h3>
            <p className="text-sm text-gray-600">{hero.name}</p>
          </div>
          <Badge className={`text-xs ${handleClass(hero.category)}`}>
            {hero.category}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit text-xs">
          {hero.team}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{hero.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-orange-500" />
              <span className="text-xs font-medium">Strength</span>
            </div>
            <Progress
              value={hero.strength * 10}
              className="h-2"
              aria-label="Strength"
              activeColor="bg-orange-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Brain className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium">Intelligence</span>
            </div>
            <Progress
              value={hero.intelligence * 10}
              className="h-2"
              aria-label="Intelligence"
              activeColor="bg-blue-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Gauge className="h-3 w-3 text-green-500" />
              <span className="text-xs font-medium">Speed</span>
            </div>
            <Progress
              value={hero.speed * 10}
              className="h-2"
              aria-label="Speed"
              activeColor="bg-green-500"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-purple-500" />
              <span className="text-xs font-medium">Durability</span>
            </div>
            <Progress
              value={hero.durability * 10}
              className="h-2"
              aria-label="Durability"
              activeColor="bg-purple-500"
            />
          </div>
        </div>

        {/* Powers */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Powers:</h4>
          <div className="flex flex-wrap gap-1">
            {/* mostramos unicamente 3 integrantes del array */}
            {hero.powers.slice(0, 3).map((power) => (
              <Badge key={power} variant="outline" className="text-xs">
                {power}
              </Badge>
            ))}
            {/* SI hay mas, ponemos un badge con un texto fijo */}
            {hero.powers.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-100">
                +{hero.powers.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 pt-2 border-t">
          First appeared: {hero.firstAppearance}
        </div>
      </CardContent>
    </Card>
  );
};
