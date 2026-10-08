import { CustomLogo } from "@/components/custom/CustomLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "cn";
import { Search } from "lucide-react";
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";

const CustomHeader = () => {
  // desestructuramos el gender del useParams
  const { gender } = useParams();

  // sacamos los search params
  const [searchParams, setSearchParams] = useSearchParams();

  // extraemos el valor que esta almacenando
  const searchQuery = searchParams.get("query") || "";

  // El borrador pertenece a la query que lo inicializo; si la URL cambia,
  // el input muestra la nueva query sin sincronizar estado mediante un efecto.
  const [searchDraft, setSearchDraft] = useState({
    query: searchQuery,
    value: searchQuery,
  });
  const searchValue =
    searchDraft.query === searchQuery ? searchDraft.value : searchQuery;

  // Al enviar el formulario, guardamos el borrador en la URL y preservamos
  // cualquier otro parametro de busqueda que ya estuviera presente.
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);

    if (!searchValue) {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", searchValue);
    }

    setSearchParams(newSearchParams);
  };

  const handleLinkClasses = (linkGender?: string) => {
    return gender === linkGender ? "underline underline-offset-4" : "";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <CustomLogo />

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                handleLinkClasses(),
              )}
            >
              Todos
            </Link>
            <Link
              to="/gender/men"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                handleLinkClasses("men"),
              )}
            >
              Hombres
            </Link>
            <Link
              to="/gender/women"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                handleLinkClasses("women"),
              )}
            >
              Mujeres
            </Link>
            <Link
              to="/gender/kid"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                handleLinkClasses("kid"),
              )}
            >
              Niños
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <form
              className="hidden md:flex items-center space-x-2"
              onSubmit={handleSearchSubmit}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar productos..."
                  className="pl-9 w-64 h-9 bg-white"
                  value={searchValue}
                  onChange={(event) =>
                    setSearchDraft({
                      query: searchQuery,
                      value: event.target.value,
                    })
                  }
                />
              </div>
            </form>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/auth/login">
              <Button variant="default" size="sm" className="ml-2">
                Login
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="destructive" size="sm" className="ml-2">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default CustomHeader;
