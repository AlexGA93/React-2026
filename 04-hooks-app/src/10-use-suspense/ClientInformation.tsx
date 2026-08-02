import { use, type Usable } from "react";
import { type User } from "./api/get-user.action";

interface Props {
  getUser: Usable<User>;
}

export const ClientInformation = ({ getUser }: Props) => {
  // use() permite leer un recurso asíncrono (como una promesa) y suspender
  // el renderizado del componente hasta que ese recurso esté listo.
  // Esto se combina con <Suspense /> para mostrar un fallback mientras carga.
  const user = use(getUser);

  /**
   * En contraste, con useEffect normalmente ejecutamos la petición después del
   * primer render. Eso implica manejar manualmente estados de loading/error y
   * actualizar la UI cuando la respuesta llega, en lugar de dejar que React
   * suspenda el render automáticamente.
   */
  // useEffect(() => {
  //   getUserAction(id).then((user) => console.log(user));
  // }, [id]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h2 className="text-4xl font-thin text-white">
        {user.name} - {user.id}
      </h2>
      <p className="text-white text-2xl">{user.location}</p>
      <p className="text-white text-xl">{user.role}</p>
    </div>
  );
};

/**
 * use - Permite leer un valor de un recurso como una promesa o contexto, suspendiendo la creacion hasta tener una resolucion.
 * Va de la mano con el componente Suspense
 */

/**
 * El componente Suspense permite desplegar un contenido hasta que sus hijos terminen de cargar
 */
