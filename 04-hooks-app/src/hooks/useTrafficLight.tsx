import { useEffect, useState } from "react";
import { colors, type TrafficLightsColors } from "../interfaces/traffic-light.types";

export const useTrafficLight = (initialValue: number) => {
  // definimos un estado local para almacenar el valor de la luz seleccionada
  const [light, setLight] = useState<TrafficLightsColors>("red");
  // definimos contador
  const [countdown, setCountdown] = useState<number>(initialValue);

  const handleTraffickLight = (selectedLight: string) => light === selectedLight ? colors[selectedLight] : "bg-gray-500";

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

  // Efecto para gestionar el cambio de luz
  useEffect(() => {
    if (countdown > 0) return;

    setCountdown(initialValue);

    switch (light) {
      case "red":
        setLight("green");
        break;
      case "yellow":
        setLight("red");
        break;
      case "green":
        setLight("yellow");
        break;
    }
    return;
  }, [countdown, light]);

  return {
    // props
    countdown,
    // computed
    percentage: (countdown / 5) * 100,
    // methods
    handleTraffickLight,
  };
};
