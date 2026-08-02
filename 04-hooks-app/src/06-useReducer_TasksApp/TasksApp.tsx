import { useEffect } from "react";
import { addToLocalStorage } from "@/utils/localStorage";
import { constants } from "@/utils/constants";
import { useTodo } from "./hooks/useTodo";
import { InputNewTask } from "./components/InputNewTask";
import { ProgressTasks } from "./components/ProgressTasks";
import { AllTasks } from "./components/AllTasks";

export const TasksApp = () => {
  // * llamamos al custom hook que reuna la logica del reducer para el componente
  const {
    state,
    inputValue,
    addTodo,
    toggleTodo,
    deleteTodo,
    handleKeyPress,
    setInputValue,
  } = useTodo();

  // * desestructuramos el estado en los elementos necesarios
  const { todos, length: totalCount, completed: completedCount } = state;
  // const completedCount = todos.filter((todo) => todo.completed).length;
  // const totalCount = todos.length;

  /**
   * * Vamos a definir un useEffect que este al tanto de state, de forma que cada vez que se actualice, se guarde de forma persistente en local storage
   */

  useEffect(() => {
    // console.log({ state });
    addToLocalStorage(constants.REDUCER.STATE_FLAG, JSON.stringify(state));
  }, [state]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Lista de Tareas
          </h1>
          <p className="text-slate-600">
            Mantén tus tareas organizadas y consigue hacerlas
          </p>
        </div>

        {/* Input Nueva Tarea */}
        <InputNewTask
          inputValue={inputValue}
          setInputValue={ setInputValue }
          handleKeyPress={handleKeyPress}
          addTodo={ addTodo }
        />

        {/* Barra de Progreso */}
        {totalCount > 0 && (
          <ProgressTasks
            completedCount={completedCount}
            totalCount={ totalCount }
          />
        )}

        {/* Contenedor de Tareas */}
        <AllTasks
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={ deleteTodo }
        />
      </div>
    </div>
  );
};
