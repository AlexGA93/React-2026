import { Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useState } from "react";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

type ActiveTabsType = "all" | "favorites" | "heroes" | "villains";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabsType>("all");

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
        <Tabs value={activeTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
              All Characters (16)
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              onClick={() => setActiveTab("favorites")}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>
              Heroes (12)
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => setActiveTab("villains")}
            >
              Villains (2)
            </TabsTrigger>
          </TabsList>
          {/* Contenido de todos */}
          <TabsContent value="all">
            {/* Mostrar todos los personajes*/}
            <HeroGrid />
          </TabsContent>
          {/* Contenido de favoritos */}
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos  */}
            <HeroGrid />
          </TabsContent>
          {/* Heroes */}
          <TabsContent value="heroes">
            {/* Mostrar todos los heroes */}
            <HeroGrid />
          </TabsContent>
          {/* Villains */}
          <TabsContent value="villains">
            {/* Mostrar todos los villanos */}
            <HeroGrid />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={8} />
      </>
    </>
  );
};

export default HomePage;
