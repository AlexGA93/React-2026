import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { use, useContext, useState } from "react";
import { UserContext } from "@/11-useContext/context/UserContext";
import { toast } from "sonner";

export const LoginPage = () => {
  const { login } = useContext(UserContext); // version <v.19

  const [userId, setUserId] = useState("");

  const navigation = useNavigate();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(userId);

    // * como leemos el contexto? Porque el handleLogin el cual hay que llamar esta proveido en el contexto
    // * hay dos maneras... una mediante useContext( v<.19)
    const result = login(+userId); // llamamos ala funcion login proveida del context mediante el useContext

    console.log({ result });

    if (!result) {
      toast.error("Usuario no encontrado");
      return;
    }

    navigation("/profile");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold">Iniciar Sesion</h1>
      <hr />

      <form
        className="flex flex-col gap-2 my-10"
        onSubmit={(event) => handleSubmit(event)}
      >
        {/* Input element */}
        <Input
          type="number"
          placeholder="Id de lusuario"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        {/* Button */}
        <Button type="submit">Login</Button>
      </form>

      <Link to="/about">
        <Button variant="ghost">Volver a la pagina principal</Button>
      </Link>
    </div>
  );
};
