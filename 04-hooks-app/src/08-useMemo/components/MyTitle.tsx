import React from "react";

interface Props {
  title: string;
}

/**
 * React.memo evita que este componente se vuelva a renderizar cuando la prop "title"
 * no cambia. En este ejemplo, si se modifica el subtítulo, el componente del título
 * no necesita volver a dibujarse.
 *
 * En versiones recientes de React, memo sigue funcionando como una optimización para
 * evitar renders innecesarios cuando las props permanecen iguales.
 *
 * Se puede aplicar de dos formas equivalentes:
 * - import React from "react"; React.memo(...)
 * - import { memo } from "react"; memo(...)
 */
export const MyTitle = React.memo(({ title }: Props) => {
  console.log("MyTitle re-render");

  return <h1 className="text-3xl">{title}</h1>;
});
