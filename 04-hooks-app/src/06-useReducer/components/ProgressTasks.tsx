import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  completedCount: number;
  totalCount: number;
}

export const ProgressTasks = ({ completedCount, totalCount }: Props) => {
  return (
    <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-slate-700">
          Progreso
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
          <span>
            {completedCount} de {totalCount} completadas
          </span>
          <span>{Math.round((completedCount / totalCount) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-linear-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
