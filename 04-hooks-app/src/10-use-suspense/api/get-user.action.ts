export interface User {
  id: string;
  name: string;
  location: string;
  role: string;
}

/**
 * Esta función simula una petición asíncrona.
 * Cuando se combina con use() y <Suspense />, React puede suspender el render
 * del componente hasta que la promesa termine. Si se usara useEffect, tendríamos
 * que manejar el estado de loading/error manualmente.
 */
export const getUserAction = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    id,
    name: "John Wick",
    location: "Behind you :)",
    role: "assassin",
  };
};
