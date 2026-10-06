import { RouterProvider } from "react-router";
import { appRouter } from "./router/app.router";

export const TesloApp = () => {
  return <RouterProvider router={appRouter} />;
};
