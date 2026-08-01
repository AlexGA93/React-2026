export const constants = {
  REDUCER: {
    TASKS: {
      STATE_FLAG: "tasks-state",
      ACTIONS: {
        ADD_TODO: "ADD_TODO",
        TOGGLE_TODO: "TOGGLE_TODO",
        DELETE_TODO: "DELETE_TODO",
      },
    },
    SCRAMBLE: {
      STATE_FLAG: "scramble-state",
      ACTIONS: {
        SET_GUESS: "SET GUESS",
        CHECK_ANSWER: "CHECK ANSWER",
        SKIP_WORD: "SKIP WORD",
        PLAY_AGAIN: "PLAY AGAIN"
      },
    },
  },
} as const;

export const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

// Esta función mezcla el arreglo para que siempre sea aleatorio
export const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
export const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};