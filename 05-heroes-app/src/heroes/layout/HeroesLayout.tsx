import { CustomMenu } from "@/components/custom/CustomMenu";
import { Outlet } from "react-router";

export const HeroesLayout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-purple-50">
      <section className="max-w-7xl mx-auto p-6">
        <CustomMenu />
        <Outlet />
      </section>
    </div>
  );
};
