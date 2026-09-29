import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";

export const CustomMenu = () => {
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    // console.log({ pathname, path });
    return pathname === path;
  };

  return (
    <NavigationMenu className="py-5">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/" />}
            className={cn(isActive("/") && "bg-slate-200", "rounded-md p-2")}
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/search" />}
            className={cn(
              isActive("/search") && "bg-slate-200",
              "rounded-md p-2",
            )}
          >
            Search
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
