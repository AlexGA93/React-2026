import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/interfaces/tasks.types";
import { Trash2 } from "lucide-react";

interface Props {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const SingleTask = ({ todos, toggleTodo, deleteTodo }: Props) => {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
            todo.completed
              ? "bg-slate-50 border-slate-200"
              : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
          }`}
        >
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => toggleTodo(todo.id)}
            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
          />
          <span
            className={`flex-1 transition-all duration-200 ${
              todo.completed ? "text-slate-500 line-through" : "text-slate-800"
            }`}
          >
            {todo.text}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteTodo(todo.id)}
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};
