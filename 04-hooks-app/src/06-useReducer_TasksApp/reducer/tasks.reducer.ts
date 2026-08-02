import type { TaskAction, TaskState, Todo } from "@/interfaces/tasks.types";
import { constants } from "@/utils/constants";
import { readFromLocalStorage } from "@/utils/localStorage";
import * as z from "zod";

/**
 * Usando Zod vamosa crear esquemas para validar nuestros objetos
 */
const TodoSchema = z.object({
    id: z.number(),
    text: z.string(),
    completed: z.boolean()
});

const TaskStateScheme = z.object({
    todos: z.array(TodoSchema),
    length: z.number(),
    completed: z.number(),
    pending: z.number(),
});

/**
 * Funcion Reducer
 * Funcion cuya finalidad es devolver un estado nuevo. Siempre debe devolver algo resolviendo uN nuevo estado
 *
 */
export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  // reaccionamos en funcion del tipo de accion
  switch (action.type) {
    case constants.REDUCER.TASKS.ACTIONS.ADD_TODO:
      // conformamos nueva tarea
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      // ! no debemos mutar estado existente. Debemos conformar uno nuevo
      // state.todos.push(newTodo);

      // devolvemos como estado  el existente actualizado
      return {
        ...state, // actual state
        todos: [...state.todos, newTodo], // actualizamos elarray con el nuevo dato
        length: state.todos.length + 1, // la longitud se incrementa por uno
        pending: state.pending + 1, // la longitud se incrementa por uno
      };
    case constants.REDUCER.TASKS.ACTIONS.TOGGLE_TODO:
      // actualizamos el parametro del todo cuyo id pasamos
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos, // asignamos el nuevo estado del array
        completed: updatedTodos.filter((todo) => todo.completed).length, // calculamos de los nuevos todos el numero de aquellos que esten completos
        pending: updatedTodos.filter((todo) => !todo.completed).length, // calculamos de los nuevos todos el numero de aquellos que NO esten completos
      };
    case constants.REDUCER.TASKS.ACTIONS.DELETE_TODO:
      const currentTodos = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );
      return {
        ...state,
        todos: currentTodos, // asignamso el nuevo estado al array
        length: currentTodos.length, // registramos la nueva longitud del array
        completed: currentTodos.filter((todo) => todo.completed).length, // calculamos de los nuevos todos el numero de aquellos que esten completos
        pending: currentTodos.filter((todo) => !todo.completed).length, // calculamos de los nuevos todos el numero de aquellos que NO esten completos
      };

    default:
      return state; // en caso de que no sea ninguna por defecto devolvemos el mismo estado que nos ha llegado
  }
};

// funcion que devuelve le estado inicial en elque no tenemos ninguna tarea registrada. Al ser constante la exportamos desde aqui para ser usada donde sea necesario
export const getTasksInitialState = (): TaskState => {
  const initialState = readFromLocalStorage(constants.REDUCER.TASKS.STATE_FLAG);

  if (!initialState) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

    // !cuidado, el objeto puede haber sido manipulado
    // para evitarlo, validamos mediante Zod usando los esquemas definidos
    const result = TaskStateScheme.safeParse(JSON.parse(initialState));
    console.log(result);

    // si la validacion da error devolvemos( al igual que si no tuvieramos contenido, el estado en blanco)
    if (result.error) {
        console.error(result.error);
        return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
    }
    
    //   return JSON.parse(initialState);
    // si no hay errores
    return result.data;
};
