import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearAuth, loadAuth, saveAuth } from "../utils/storage.js";
import authService from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = loadAuth();
    if (cached?.user) {
      setUser(cached.user);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.user);
    saveAuth({ user: response.user, token: response.token });
    return response.user;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearAuth();
  }, []);

  const value = useMemo(() => {
    return {
      user,
      role: user?.role,
      isAuthenticated: Boolean(user),
      loading,
      login,
      logout
    };
  }, [user, loading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
};
