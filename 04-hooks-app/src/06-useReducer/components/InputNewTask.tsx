import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  addTodo: () => void;
}

export const InputNewTask = ({
  inputValue,
  setInputValue,
  handleKeyPress,
  addTodo,
}: Props) => {
  return (
    <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex gap-2">
          <Input
            placeholder="Añade una nueva tarea..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
          />
          <Button
            onClick={addTodo}
            className="bg-slate-800 hover:bg-slate-700 text-white px-4"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
