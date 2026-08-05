import { CustomJumbotrom } from "@/components/custom/CustomJumbotrom";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";

export const SearchPage = () => {
  return (
    <>
      {/* Header */}
      <CustomJumbotrom
        title="Superhero Universe"
        description="Discover, explore, and manage your favorite superheroes and villains"
      />
      {/* Stats Dashboard */}
      <HeroStats />
      {/* Controls */}
      <SearchControls />
    </>
  );
};

export default SearchPage;
