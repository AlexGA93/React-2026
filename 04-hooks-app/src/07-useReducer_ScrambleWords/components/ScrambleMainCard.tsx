import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, SkipForward } from "lucide-react";

interface Props {
    currentWord: string;
    scrambledWord: string;
    guess: string;
    isGameOver: boolean;
    points: number;
    totalWords: number;
    errorCounter: number;
    maxAllowErrors: number;
    skipCounter: number;
    maxSkips: number;
    handleSkip: () => void;
    handlePlayAgain: () => void;
    handleDispatchGuess:  (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
    handleGuessSubmit: (e: React.ChangeEvent<Element, Element>) => void;
}

export const ScrambleMainCard = ({
    currentWord,
    scrambledWord,
    guess,
    isGameOver,
    points,
    totalWords,
    errorCounter,
    maxAllowErrors,
    skipCounter,
    maxSkips,
    handleSkip,
    handlePlayAgain,
    handleDispatchGuess,
    handleGuessSubmit,
    
}: Props) => {
  return (
    <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
      <CardContent className="p-8">
        {/* Scrambled Word Display */}
        <div className="mb-8">
          <h2 className="text-center text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide flex items-center justify-center gap-2">
            Palabra Desordenada
            {isGameOver && (
              <span className="text-red-500 text-xl"> {currentWord}</span>
            )}
          </h2>

          <div className="flex justify-center gap-2 mb-6">
            {scrambledWord.split("").map((letter, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg transform hover:scale-105 transition-transform duration-200"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        {/* Guess Input */}
        <form onSubmit={handleGuessSubmit} className="mb-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="guess"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Adivina la palabra
              </label>
              <Input
                id="guess"
                type="text"
                value={guess}
                onChange={(e) => handleDispatchGuess(e)}
                placeholder="Ingresa tu palabra..."
                className="text-center text-lg font-semibold h-12 border-2 border-indigo-200 focus:border-indigo-500 transition-colors"
                maxLength={scrambledWord.length}
                disabled={isGameOver}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              disabled={!guess.trim() || isGameOver}
            >
              Enviar Adivinanza
            </Button>
          </div>
        </form>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200">
            <div className="text-2xl font-bold text-green-600">
              {points} / {totalWords}
            </div>
            <div className="text-sm text-green-700 font-medium">Puntos</div>
          </div>
          <div className="bg-linear-to-br from-red-50 to-rose-50 rounded-lg p-4 text-center border border-red-200">
            <div className="text-2xl font-bold text-red-600">
              {errorCounter}/{maxAllowErrors}
            </div>
            <div className="text-sm text-red-700 font-medium">Errores</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleSkip}
            variant="outline"
            className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            disabled={isGameOver || skipCounter >= maxSkips}
          >
            <SkipForward className="w-4 h-4" />
            Saltar ({skipCounter} / {maxSkips})
          </Button>
          <Button
            onClick={handlePlayAgain}
            variant="outline"
            className="border-2 border-indigo-300 hover:border-indigo-400 hover:bg-indigo-50 text-indigo-600 transition-colors flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4" />
            Jugar de nuevo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
