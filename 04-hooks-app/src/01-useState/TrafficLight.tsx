import { useState } from "react";

const colors: Record<string, string> = {
    red:    "bg-red-500 animate-pulse",
    yellow: "bg-yellow-500 animate-pulse",
    green:  "bg-green-500 animate-pulse"
};

// opcio simple de tipado
// type TrafficLightsColors = 'red' | 'yellow' | 'green';
// opcion mas avanzada dejando el tipado el tipado en funcion de las keys de un objeto
type TrafficLightsColors = keyof typeof colors;

export const TrafficLight = () => {

    // definimos un estado local para almacenar el valor de la luz seleccionada
    const [light, setLight] = useState<TrafficLightsColors>('red');

    /**
     * En funcion del estado escogido el componente debe reaccionar redibujandose cambiando los estilos( en este caso)
     */
    const handleTraffickLight = (selectedLight: string) => {
        return light === selectedLight ? colors[selectedLight] : 'bg-gray-500';
    };

    // funcion que actualiza el estado (entre otras cosas)
    const handleColorChange = (color: TrafficLightsColors) => { 
        // usamos la funcion de actualizacion de estado llamando al callback interno para acceder al valor anterior
        setLight((previousValue) => {
            console.log(previousValue);
            return color;
        });
    };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
          <div className="flex flex-col items-center space-y-8">
              <div className={`w-32 h-32 ${handleTraffickLight('red')} rounded-full`}></div>
              <div className={`w-32 h-32 ${handleTraffickLight('yellow')} rounded-full`}></div>
              <div className={`w-32 h-32 ${handleTraffickLight('green')} rounded-full`}></div>

              {/* Boton para cambiar el estado de la luz */}
              <div className="flex gap-2">
                  <button onClick={() => handleColorChange('red')} className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer">Rojo</button>
                  <button onClick={() => handleColorChange('yellow')} className="bg-yellow-500 text-white px-4 py-2 rounded-md cursor-pointer">Amarillo</button>
                  <button onClick={() => handleColorChange('green')} className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer">Verde</button>
              </div>
          </div>      
    </div>
  )
}
