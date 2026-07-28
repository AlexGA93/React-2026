import { useTrafficLight } from "../hooks/useTrafficLight";

const COUNTER_DEFAULT_VALUE = 5;

export const TrafficLightWithHook = () => {

  // desestructuramos las variables y metodos del custom hook
  const { countdown, percentage, handleTraffickLight } = useTrafficLight(COUNTER_DEFAULT_VALUE); 

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-800 flex items-center justify-center p-4">
      <div className="flex flex-col items-center space-y-8">
        <h1 className="text-white text-2xl">Semaforo con Custom Hook</h1>
        <h2 className="text-white">Countdown: {countdown}</h2>
        <div className="w-64 bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${percentage}%` }}
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
