import { useCounter } from "@/hooks/useCounter";
import { useMemo } from "react";

// definimos una funcion externa que representara un proceso muy pesado
const heavyStuff = (iterationNumber: number) => {
  console.time("heavy_stuff_started");

  for (let index = 0; index < iterationNumber; index++) {
    console.log("Iteraciones a saco!");
  }

  console.timeEnd("heavy_stuff_started");

  return `${iterationNumber} iteraciones realizadas`;
};

export const MemoCounter = () => {
  const { counter, increment } = useCounter(40_000);
  const { counter: counter2, increment: increment2 } = useCounter(10);

  // useMemo se utiliza para guardar el resultado de un cálculo o proceso costoso
  // y evitar que se vuelva a ejecutar cada vez que el componente renderiza.
  // En este ejemplo, heavyStuff(counter) realiza muchas iteraciones y sería lento
  // repetirlo en cada render. Por eso, con useMemo, solo se ejecuta cuando cambia
  // el valor de counter.
  //
  // A diferencia de memo o useCallback:
  // - memo evita re-renderizados del componente.
  // - useCallback memoriza funciones para mantener la misma referencia.
  // - useMemo memoriza el resultado de un cálculo costoso.
  //
  // En otras palabras, useMemo sirve para optimizar el rendimiento cuando hay
  // operaciones pesadas que no deberían volver a ejecutarse innecesariamente.
  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo {myHeavyValue}</h1>
      <hr />

      <h4>Counter: {counter} </h4>
      <h4>Counter: {counter2} </h4>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={increment}
      >
        +1
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={increment2}
      >
        +1 - Counter2
      </button>
    </div>
  );
};
