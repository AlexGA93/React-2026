import type { constants } from "@/utils/constants";

export interface ScrambleWordsState {
    currentWord: string;
    errorCounter: number;
    guess: string;
    isGameOver: boolean;
    maxAllowErrors: number;
    maxSkips: number;
    points: number;
    scrambledWord: string;
    skipCounter: number;
    words: string[];
    totalWords: number;
}

export type ScrambleWordsAction =
    | {
        type: typeof constants.REDUCER.SCRAMBLE.ACTIONS.SET_GUESS,
        payload: string;
    }
    | {
        type: typeof constants.REDUCER.SCRAMBLE.ACTIONS.CHECK_ANSWER
    }
    | {
        type: typeof constants.REDUCER.SCRAMBLE.ACTIONS.SKIP_WORD,
    }
    | {
        type: typeof constants.REDUCER.SCRAMBLE.ACTIONS.PLAY_AGAIN,
        payload: ScrambleWordsState
    }
    ;