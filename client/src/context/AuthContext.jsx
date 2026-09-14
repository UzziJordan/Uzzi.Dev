import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentAdmin,
  logoutAdmin,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      // Remove tokens left behind by the previous localStorage approach.
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");

      try {
        const data = await getCurrentAdmin();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setIsAuthReady(true);
      }
    };

    restoreSession();
  }, []);

  const login = (user) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } finally {
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthReady,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
