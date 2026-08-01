import { useReducer, useState } from "react";
import { getTasksInitialState, taskReducer } from "../reducer/tasks.reducer";
import { constants } from "@/utils/constants";

export const useTodo = () => {
  // sustituido por useReducer
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [state, dispatch] = useReducer(
    // reducer
    taskReducer,
    // estado inicial
    getTasksInitialState(),
  );

  const [inputValue, setInputValue] = useState("");

  // const addTodo = () => {
  //   console.log('Agregar tarea', inputValue);

  //   // evitamos que se creen tareas sin texto
  //   if (inputValue.length === 0) return;

  //   // creamos nueva instancia de la tarea
  //   const newTodo: Todo = {
  //     id: Date.now(),
  //     text: inputValue.trim(),
  //     completed: false
  //   };

  //   // en lugar de modificar el array directamente sin dejar al useState que sepa de ello, usamos la funcion dispatch del estado pasandole una copia del array actual junto con el nuevo valor (usaremos el spread operator para ello)

  //   // setTodos([...todos, newTodo]); // puede que no tengamos acceso al array todos, podemos abordarlo con el callback interno de la funcion
  //   setTodos(prevValue => [...prevValue, newTodo]);

  //   // reseteamos el estado del input para limpiar
  //   setInputValue('');
  // };

  const addTodo = () => {
    console.log("Agregar tarea", inputValue);

    // evitamos que se creen tareas sin texto
    if (inputValue.length === 0) return;

    // despachamos la accion con la info necesaria
    dispatch({ type: "ADD_TODO", payload: inputValue });

    // reseteamos el estado del input para limpiar
    setInputValue("");
  };

  // const toggleTodo = (id: number) => {
  //   // console.log('Cambiar de true a false', id);
  //   const updatedTodos = todos.map(todo => {
  //     if (todo.id === id) {
  //       return { ...todo, completed: !todo.completed }
  //     }
  //     return todo;
  //   });

  //   setTodos(updatedTodos);

  // };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  // const deleteTodo = (id: number) => {
  //   // console.log('Eliminar tarea', id);
  //   const filteredTodos = todos.filter(todo => todo.id !== id);
  //   setTodos(filteredTodos);
  // };

  const deleteTodo = (id: number) => {
    dispatch({ type: constants.REDUCER.ACTIONS.DELETE_TODO, payload: id });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // console.log('Presiono enter');
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return {
    // props
      state,
      inputValue,
    // computed
    // methods
    addTodo,
    toggleTodo,
    deleteTodo,
    handleKeyPress,
    setInputValue
  };
};
