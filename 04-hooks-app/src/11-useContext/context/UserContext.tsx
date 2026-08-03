import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { users, type User } from "../data/user-mock.data";
import {
  addToLocalStorage,
  deleteFromLocalStorage,
  readFromLocalStorage,
} from "@/utils/localStorage";

type AuthStatus = "checking" | "authenticated" | "not-authenticated";

interface UserContextProps {
  // state
  authStatus: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;
  // methods
  login: (userId: number) => boolean;
  logout: () => void;
}

// creamos el contexto
export const UserContext = createContext({} as UserContextProps);

// HOC - High Order Component
// un Provider es un HOC el cual es capaz de suministrar estados o funcionalidades a todos sus hijos, los cuales van a pdoer navegar hasta el mediante useContext o use (para versiones superiores)
export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userId: number) => {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      console.error(`User not found ${userId}`);
      setUser(null);
      setAuthStatus("not-authenticated");
      return false;
    }

    setUser(user);
    setAuthStatus("authenticated");
    addToLocalStorage("userId", JSON.stringify(userId));
    return true;
  };

  const handleLogout = () => {
    console.log("logout");
    setAuthStatus("not-authenticated");
    setUser(null);
    deleteFromLocalStorage("userId");
  };

  useEffect(() => {
    const storedUserId = readFromLocalStorage("userId");

    if (storedUserId) {
      handleLogin(+storedUserId);
      return;
    }

    handleLogout();
  }, []);

  return (
    <UserContext
      value={{
        authStatus,
        isAuthenticated: authStatus === "authenticated",
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
