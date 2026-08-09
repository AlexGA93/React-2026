import { HeroGridCard } from "./HeroGridCard";

export const HeroGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {/* Hero Card 1 - Superman */}
      <HeroGridCard />
      {/* Hero Card 2 - Batman */}
      {/* <HeroGridCard /> */}
      {/* Hero Card 3 - Wonder Woman */}
      {/* <HeroGridCard /> */}
      {/* Hero Card 4 - Spider-Man */}
      {/* <HeroGridCard /> */}
      {/* Hero Card 5 - Iron Man */}
      {/* <HeroGridCard /> */}
      {/* Hero Card 6 - Deadpool */}
      {/* <HeroGridCard /> */}
    </div>
  );
};
