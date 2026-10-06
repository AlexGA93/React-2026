import { CustomLogo } from "@/components/custom/CustomLogo";
import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Home,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { pathname } = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", to: "/admin" },
    { icon: BarChart3, label: "Productos", to: "/admin/products" },
    { icon: Users, label: "Usuarios" },
    { icon: ShoppingCart, label: "Ordenes" },
    { icon: FileText, label: "Reportes" },
    { icon: Bell, label: "Notificationes" },
    { icon: Settings, label: "Ajustes" },
    { icon: HelpCircle, label: "Ayuda" },
  ];
  // console.log(pathname);
  const isActiveRoute = (to: string) => {
    // condicion para la seccion de producto nuevo. Devovlemos true en caso de encontrarnos en cualquier ruta interna de products
    if (pathname.includes("/admin/products/") && to === "/admin/products") {
      return true;
    }
    return pathname === to;
  };

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between h-18">
        {!isCollapsed && <CustomLogo />}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  to={item.to || "/admin"}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${
                    isActiveRoute(item.to || "/xxx")
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon size={20} className="shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                John Doe
              </p>
              <p className="text-xs text-gray-500 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
