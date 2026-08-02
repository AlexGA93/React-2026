import type { ScrambleWordsAction, ScrambleWordsState } from "@/interfaces/scramebleWord.types";
import { constants, GAME_WORDS, scrambleWord, shuffleArray } from "@/utils/constants";

export const getInitialState = (): ScrambleWordsState => {
  const shuffleWords = shuffleArray([...GAME_WORDS]);

  return {
    currentWord: shuffleWords[0],
    errorCounter: 0,
    guess: "",
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: scrambleWord(shuffleWords[0]),
    skipCounter: 0,
    words: shuffleWords,
    totalWords: shuffleWords.length,
  }
};

// reducer
export const scrambleWordsReducer = (state: ScrambleWordsState, action: ScrambleWordsAction): ScrambleWordsState => {
  switch (action.type) {
    case constants.REDUCER.SCRAMBLE.ACTIONS.SET_GUESS:
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };
    case constants.REDUCER.SCRAMBLE.ACTIONS.CHECK_ANSWER: {
      
      // si la palabra es igual a la que debe
      if (state.guess === state.currentWord) {
        const newWords = state.words.slice(1);

        return {
          ...state,
          // reducimos el array de palabras
          words: newWords,
          // anotamos un punto
          points: state.points + 1,
          // limpiamos el input
          guess: '',
          // establecemos la palabra a evaluar
          currentWord: newWords[0],
          // scramble
          scrambledWord: scrambleWord(newWords[0])
        };
      }

      // si ocurre un error
      return {
        ...state,
        // limpiamos el input
        guess: '',
        // caso de error
        errorCounter: state.errorCounter + 1,
        // comprobamos que sea o no game over
        isGameOver: state.errorCounter + 1 >= state.maxAllowErrors,
      };
    }
    case constants.REDUCER.SCRAMBLE.ACTIONS.SKIP_WORD: { 
      // comprobamos si hemos superado el numero de maximos saltos permitidos, entonces no hacemos nada
      if (state.skipCounter >= state.maxSkips) return state;

      // reducimos el array de palabras
      const updatedWords = state.words.slice(1);

      return {
        ...state,
        words: updatedWords,
        // actualizamos el numer ode skips hechos
        skipCounter: state.skipCounter + 1,
        // reiniciamos la palabra nueva
        currentWord: updatedWords[0],
        // scrambleWords
        scrambledWord: scrambleWord(updatedWords[0]),
        // limpiamos el input
        guess: '',
      };
    }
    case constants.REDUCER.SCRAMBLE.ACTIONS.PLAY_AGAIN:
      return action.payload;
    
    default:
      return state;
  }
};