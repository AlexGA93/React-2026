export const colors: Record<string, string> = {
  red: "bg-red-500 animate-pulse",
  yellow: "bg-yellow-500 animate-pulse",
  green: "bg-green-500 animate-pulse",
};

// opcio simple de tipado
// type TrafficLightsColors = 'red' | 'yellow' | 'green';
// opcion mas avanzada dejando el tipado el tipado en funcion de las keys de un objeto
export type TrafficLightsColors = keyof typeof colors;