import { memo } from "react";

interface Props {
  subtitle: string;
  callMyAPI: () => void;
}

/**
 * memo permite memorizar este componente para que no se vuelva a renderizar cuando
 * sus props siguen siendo las mismas. En este ejemplo, si cambia el título, el
 * componente del subtítulo no necesita ejecutarse de nuevo.
 *
 * En versiones recientes de React, esta técnica sigue siendo útil para optimizar
 * rendimiento, especialmente cuando un componente recibe props estables y no requiere
 * actualizarse en cada render. Además, React.memo y memo son equivalentes en su función.
 *
 * La prop callMyAPI también se beneficia de useCallback, porque al conservar la misma
 * referencia entre renders, React puede evitar que este componente reciba una función
 * nueva en cada actualización. Esto mejora la estabilidad del flujo de props y reduce
 * efectos innecesarios en componentes optimizados.
 */
export const MySubtitle = memo(({ subtitle, callMyAPI }: Props) => {
  console.log("MySubtitle re-render");

  return (
    <>
      <h6 className="text-2xl font-bold">{subtitle}</h6>
      <button
        className="bg-indigo-500 text-white px-2 py-1 rounded-md"
        onClick={callMyAPI}
      >
        Llamar a funcion
      </button>
    </>
  );
});
