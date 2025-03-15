import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  register,
  login,
  logout as logoutAPI,
  checkUserLoggedIn,
  updateProfile as updateProfileAPI,
} from "../lib/auth.api";
import Cookie from "js-cookie";
// API URL
const API_URL = "http://localhost:5050/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedInContext();
  }, []);

  // Register user
  const registerUser = async (userData) => {
    const user = await register(userData);
    setUser(user);
    router.push("/dashboard");
  };

  // Login user
  const loginUser = async (userData) => {
    const user = await login(userData);
    setUser(user);
    router.push("/dashboard");
  };

  // Logout user
  const logout = () => {
    logoutAPI();
    setUser(null);
    router.push("/");
  };

  // Check if user is logged in
  const checkUserLoggedInContext = async () => {
    try {
      const user = await checkUserLoggedIn();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
    setLoading(false);
  };

  const updateProfile = async (userData) => {
    try {
      const updatedUser = await updateProfileAPI(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register: registerUser,
        login: loginUser,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
