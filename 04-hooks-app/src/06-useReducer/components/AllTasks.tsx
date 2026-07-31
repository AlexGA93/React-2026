import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Todo } from "@/interfaces/tasks.types";
import { NoTasks } from "./NoTasks";
import { SingleTask } from "./SingleTask";

interface Props {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const AllTasks = ({ todos, toggleTodo, deleteTodo }: Props) => {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-700">
          Tareas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* listado de tareas */}
        {todos.length === 0 ? (
          <NoTasks />
        ) : (
          <SingleTask
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        )}
      </CardContent>
    </Card>
  );
};
