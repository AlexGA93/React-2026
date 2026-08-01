import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface Props {
  points: number;
  errorCounter: number;
  skipCounter: number;
  handlePlayAgain: () => void;
}

export const ScrambleWin = ({
  points,
  errorCounter,
  skipCounter,
  handlePlayAgain,
}: Props) => {
  // renderizamos el confetti
  confetti({
    particleCount: 100,
    spread: 120,
    origin: { y: 0.6 },
  });
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Palabras desordenadas
        </h1>
        <p className="text-gray-600">No hay palabras para jugar</p>
        <br />
        <div>Puntaje: {points}</div>
        <br />
        <div>Errores: {errorCounter}</div>
        <br />
        <div>Saltos: {skipCounter}</div>
        <br />
        <Button onClick={handlePlayAgain}>Jugar de nuevo</Button>
      </div>
    </div>
  );
};
