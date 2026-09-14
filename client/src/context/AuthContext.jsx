import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getCurrentAdmin,
  logoutAdmin,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("adminUser");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("adminToken");
      const isAdminRoute =
        location.pathname.startsWith("/admin") &&
        location.pathname !== "/admin/login";

      // If user has no token and is NOT on an admin route,
      // do not make an unnecessary /auth/me call that produces a 401 in the console.
      if (!token && !isAdminRoute) {
        setIsAuthReady(true);
        return;
      }

      // If on an admin route without a stored token, try cookie-based check
      if (!token) {
        try {
          const data = await getCurrentAdmin();
          setUser(data.user);
          localStorage.setItem("adminUser", JSON.stringify(data.user));
        } catch {
          setUser(null);
          localStorage.removeItem("adminUser");
        } finally {
          setIsAuthReady(true);
        }
        return;
      }

      // If token exists, verify with server
      try {
        const data = await getCurrentAdmin();
        setUser(data.user);
        localStorage.setItem("adminUser", JSON.stringify(data.user));
      } catch {
        setUser(null);
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
      } finally {
        setIsAuthReady(true);
      }
    };

    restoreSession();
  }, [location.pathname]);

  const login = (userData, token) => {
    if (token) {
      localStorage.setItem("adminToken", token);
    }
    if (userData) {
      localStorage.setItem("adminUser", JSON.stringify(userData));
    }
    setUser(userData);
    setIsAuthReady(true);
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
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
