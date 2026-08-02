import type { constants } from "@/utils/constants";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

// export type TaskAction =
//     | { type: "ADD_TODO", payload: string }
//     | { type: "TOGGLE_TODO", payload: number }
//     | { type: "DELETE_TODO", payload: number }
//     ;

export type TaskAction =
  | {
      type: typeof constants.REDUCER.TASKS.ACTIONS.ADD_TODO;
      payload: string;
    }
  | {
      type: typeof constants.REDUCER.TASKS.ACTIONS.TOGGLE_TODO;
      payload: number;
    }
  | {
      type: typeof constants.REDUCER.TASKS.ACTIONS.DELETE_TODO;
      payload: number;
    };
