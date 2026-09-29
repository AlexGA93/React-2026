import { Spinner } from "@/components/ui/spinner";

export const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950/5 px-4">
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-4 rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm dark:border-slate-800 dark:bg-slate-950"
      >
        <Spinner className="h-10 w-10 text-primary" />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Cargando...
        </p>
      </div>
    </div>
  );
};
