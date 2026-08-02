// ! Importante:
// Es necesario componentes de Shadcn/ui
// https://ui.shadcn.com/docs/installation/vite

import React, { useEffect, useReducer } from "react";
import { constants } from "@/utils/constants";
import {
  getInitialState,
  scrambleWordsReducer,
} from "./reducer/scrambleWord.reducer";
import confetti from "canvas-confetti";
import { ScrambleWin } from "./components/ScrambleWin";
import { ScrambleMainCard } from "./components/ScrambleMainCard";

export const ScrambleWords = () => {
  // * 1. Definimos el scrameble reducer y estado inicial
  const [state, dispatch] = useReducer(scrambleWordsReducer, getInitialState());
  // * 2. desestructuracion del state
  const {
    words,
    currentWord,
    errorCounter,
    guess,
    isGameOver,
    maxAllowErrors,
    maxSkips,
    points,
    scrambledWord,
    skipCounter,
    totalWords,
  } = state;

  const handleGuessSubmit = (e: React.ChangeEvent) => {
    // Previene el refresh de la página
    e.preventDefault();

    // Implementar lógica de juego
    console.log("Intento de adivinanza:", guess, currentWord);

    // despachamos accion al reducer
    dispatch({ type: constants.REDUCER.SCRAMBLE.ACTIONS.CHECK_ANSWER });
  };

  const handleSkip = () => {
    console.log("Palabra saltada");

    // despachamos accion al reducer
    dispatch({ type: constants.REDUCER.SCRAMBLE.ACTIONS.SKIP_WORD });
  };

  const handlePlayAgain = () => {
    console.log("Jugar de nuevo");

    // despachamos accion al reducer
    dispatch({
      type: constants.REDUCER.SCRAMBLE.ACTIONS.PLAY_AGAIN,
      payload: getInitialState(),
    });
  };

  const handleDispatchGuess = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    dispatch({
      type: constants.REDUCER.SCRAMBLE.ACTIONS.SET_GUESS,
      payload: e.target.value,
    });
  };

  useEffect(() => {
    // si no anotamos punto no hacemos nada
    if (points === 0) return;

    // renderizamos confetti
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.6 },
    });
  }, [points]);

  return (
    <div>
      {words.length === 0 ? (
        <ScrambleWin
          points={points}
          errorCounter={errorCounter}
          skipCounter={skipCounter}
          handlePlayAgain={handlePlayAgain}
        />
      ) : (
        <div className="min-h-screen bg-linear-to-br from-purple-100 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Palabras desordenadas
              </h1>
              <p className="text-gray-600">
                Desordena las letras para encontrar la palabra!
              </p>
            </div>

            {/* Main Game Card */}
              <ScrambleMainCard
              currentWord={currentWord}
              scrambledWord={scrambledWord}
              guess={guess}
              isGameOver={isGameOver}
              points={points}
              totalWords={totalWords}
              errorCounter={errorCounter}
              maxAllowErrors={maxAllowErrors}
              skipCounter={skipCounter}
              maxSkips={maxSkips}
              handleSkip={handleSkip}
              handlePlayAgain={handlePlayAgain}
              handleDispatchGuess={handleDispatchGuess}
              handleGuessSubmit={handleGuessSubmit}
              />

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Desafíate con palabras desordenadas!
                <br />
                <br />
                {words.join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
