import { Input } from "@/components/ui/input";
import { Bell, MessageSquare, Search, Settings } from "lucide-react";
import React, { useState } from "react";
import { useSearchParams } from "react-router";

const Header: React.FC = () => {
  // * 1. sacamos los searchParams
  const [searchParams, setSearchParams] = useSearchParams();

  // * 2. extraemos el valor de la url almacenada
  const adminSearchQuery = searchParams.get("query") || "";

  // * 3. definimos el estado local para almacenar y gestionar la palabra
  const [adminSearchDraft, setAdminSearchDraft] = useState({
    query: adminSearchQuery,
    value: adminSearchQuery,
  });

  // * 4. definimos variable que almacene el valor del cuadro de busqueda si coincide con el parametro - ASIGNAMOS AL ELEMENTO HTML
  const adminSearchValue =
    adminSearchDraft.query === adminSearchQuery
      ? adminSearchDraft.value
      : adminSearchQuery;

  // * 5. Funcion que gestiona el cambio del estado en funcion de que escribe el usuario
  const handleChangeDraft = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    // actualizamos el estado
    setAdminSearchDraft({
      query: adminSearchQuery,
      value: e.target.value,
    });
  };

  const handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newSearchParams = new URLSearchParams(searchParams);

    if (!adminSearchValue) {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", adminSearchValue);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-18">
      <div className="flex items-center justify-between">
        {/* Search */}
        <form onSubmit={handleSearchSubmit}>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={adminSearchValue}
                onChange={(e) => handleChangeDraft(e)}
              />
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare size={20} />
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
