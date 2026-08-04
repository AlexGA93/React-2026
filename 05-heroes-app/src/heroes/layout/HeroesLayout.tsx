import { Outlet } from "react-router";

export const HeroesLayout = () => {
  return (
    <div className="bg-amber-600">
      <Outlet />
    </div>
  );
};
