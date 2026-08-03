import { UserContext } from "@/11-useContext/context/UserContext";
import { Button } from "@/components/ui/button";
import { use } from "react";
import { Link } from "react-router";

export const ProfilePage = () => {
  // const { user } = useContext(UserContext); // version <v.19
  const { user, logout } = use(UserContext); // version > v.19

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl">Perfil de usuario</h1>
      <hr />

      <pre className="my-4 w-[80%]">{JSON.stringify(user, null, 2)}</pre>

      <Button onClick={logout} variant="destructive">
        Salir
      </Button>

      <Link to="/about">
        <Button variant="ghost">Volver a la pagina principal</Button>
      </Link>
    </div>
  );
};
