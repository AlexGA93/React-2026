import { Check } from "lucide-react";

export const NoTasks = () => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
        <Check className="w-8 h-8 text-slate-400" />
      </div>
      <p className="text-slate-500 text-lg mb-2">No hay tareas</p>
      <p className="text-slate-400 text-sm">
        Añade una tarea arriba para empezar
      </p>
    </div>
  );
};
