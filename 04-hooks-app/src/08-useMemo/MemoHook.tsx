import { useCallback, useState } from "react";
import { MyTitle } from "./components/MyTitle";
import { MySubtitle } from "./components/MySubtitle";

export const MemoHook = () => {
  // estados locales de titulo y subtitulo
  const [title, setTitle] = useState("Hola");
  const [subtitle, setSubtitle] = useState("Mundo");

  /* 
  useCallback memoriza esta función para que React mantenga la misma referencia entre renders mientras sus dependencias no cambien.
  
  En versiones antiguas de React, esto era especialmente útil porque las funciones se recreaban en cada render y podían provocar renders innecesarios en componentes hijos memorizados o en efectos que dependían de esa referencia.

  En la versión actual, sigue siendo útil cuando se pasa una función como prop a un componente optimizado o cuando se necesita que una función conserve la misma identidad entre renders.Esto ayuda a evitar renders innecesarios y a mantener un comportamiento más estable en callbacks y efectos.
  */

  const handleMyAPI = useCallback(() => {
    console.log("Llamar a mi API - ", subtitle);
  }, [subtitle]);

  /* 
  Este componente padre se vuelve a renderizar cuando cambia alguno de sus estados.
  
  Sin embargo, los componentes hijos no necesitan actualizarse si la información que reciben no cambió. Por esa razón se utilizan componentes memorizados con memo.
  
  En versiones recientes de React, este mecanismo sigue siendo útil para evitar renders innecesarios y mejorar el rendimiento cuando los props permanecen iguales.
  */
  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoHook</h1>

      {/* titulo */}
      <MyTitle title={title} />
      {/* subtitulo */}
      <MySubtitle subtitle={subtitle} callMyAPI={handleMyAPI} />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle("Hello " + new Date().getTime())}
      >
        Cambiar Titulo
      </button>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setSubtitle("World")}
      >
        Cambiar Subitulo
      </button>
    </div>
  );
};
