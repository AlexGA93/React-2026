import { Outlet } from "react-router";

export const AdminLayout = () => {
  return (
    <div className="bg-indigo-600">
      <Outlet />
    </div>
  );
};
