import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

export const SearchPage = () => {
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
        breadcrumbs={[
          { label: "Home1", to: "/" },
          { label: "Home2", to: "/" },
          { label: "Home3", to: "/" },
        ]}
      />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Controls */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
