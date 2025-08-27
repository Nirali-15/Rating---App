// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore token from localStorage and fetch current user
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Fetch actual user details from /auth/me
          const res = await api.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error("Error fetching user:", err);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token } = res.data;

    // Save token
    localStorage.setItem("token", token);

    // Fetch full user info from /auth/me
    const userRes = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(userRes.data);

    return userRes.data;
  };

  const signup = async (payload) => {
    await api.post("/auth/signup", payload);
  };

  const updatePassword = (payload) => api.put("/auth/update-password", payload);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, updatePassword, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
