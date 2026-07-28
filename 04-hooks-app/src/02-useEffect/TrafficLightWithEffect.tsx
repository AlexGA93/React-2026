import { useEffect, useState } from "react";

const COUNTDOWN_DEFAULT_VALUE = 5;

const colors: Record<string, string> = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

// opcio simple de tipado
// type TrafficLightsColors = 'red' | 'yellow' | 'green';
// opcion mas avanzada dejando el tipado el tipado en funcion de las keys de un objeto
type TrafficLightsColors = keyof typeof colors;

export const TrafficLightWithEffect = () => {
  // definimos un estado local para almacenar el valor de la luz seleccionada
  const [light, setLight] = useState<TrafficLightsColors>("red");
  // definimos contador
  const [countdown, setCountdown] = useState<number>(COUNTDOWN_DEFAULT_VALUE);

  // En funcion del estado escogido el componente debe reaccionar redibujandose cambiando los estilos( en este caso)
  const handleTraffickLight = (selectedLight: string) => {
    return light === selectedLight ? colors[selectedLight] : "bg-gray-500";
  };

  // declaramos un useEffect
  /**
   * No array: Runs after every single render.
   * Empty array []: Runs only once when the component mounts.
   * With dependencies [prop, state]: Runs on mount and whenever a dependency value changes.
   */

  useEffect(() => {
    if (countdown === 0) return;

    // almacenamos el producto del interval en una variable para llamarla en la funcio nde limpieza
    const intervalId = setInterval(
      () => {
        // actualizamos el estado con el valor previo alamcenado
        setCountdown((prev) => prev - 1);
      },
      // cambios efectuados cada 1000ms = 1s
      1000,
    );

    // * debemos llamar a la funcion clean up para limpiar el propio intervalo
    return () => {
      console.log("Cleanup Effect");
      clearInterval(intervalId);
    };
  }, [countdown]);
  /**
   * !CUIDADO: FUGA DE MEMORIA CON ESTE CODIGO DEBIDO A QUE LLAMAMOS A UNA ACTUALZIACIO NDEL ESTADO EL CUAL DISPARA EL PROPIO EFECTO Y CON ESTE OTRA ACTUALIZACION
   */
  // useEffect(() => {
  //     // en funcion de la frecuencia de cambios en la variable en el array de dependencias, se lanza el contenido del callback
  //     setInterval(() => {
  //         setCountdown(prev => prev-1)
  //     }, 1000)

  // }, [countdown]);

  // Efecto para gestionar el cambio de luz
  useEffect(() => {
    if (countdown > 0) return;

      setCountdown(COUNTDOWN_DEFAULT_VALUE);
      
    switch (light) {
      case "red":
        setLight("green");
        break;
      case "yelow":
        setLight("red");
        break;
      case "green":
        setLight("yellow");
        break;
    }
    return;
  }, [countdown, light]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-2xl">Semaforo con useEffect</h1>
        <h2 className="text-white">Countdown: {countdown}</h2>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 5) * 100}%` }}
          ></div>
        </div>
        <div
          className={`w-32 h-32 ${handleTraffickLight("red")} rounded-full`}
        ></div>
        <div
          className={`w-32 h-32 ${handleTraffickLight("yellow")} rounded-full`}
        ></div>
        <div
          className={`w-32 h-32 ${handleTraffickLight("green")} rounded-full`}
        ></div>
      </div>
    </div>
  );
};
