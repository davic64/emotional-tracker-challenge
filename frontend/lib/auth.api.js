import api from "./api";
import Cookie from "js-cookie";

// Register user
export const register = async (userData) => {
  try {
    const res = await api.post("/users/register", userData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const res = await api.post("/users/login", userData);
    Cookie.set("token", res.data.token);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Logout user (frontend only)
export const logout = () => {
  Cookie.remove("token");
};

// Check if user is logged in
export const checkUserLoggedIn = async () => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      throw new Error("No token found");
    }
    const res = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    Cookie.remove("token");
    throw error;
  }
};

// Update user profile
export const updateProfile = async (userData) => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      throw new Error("No token found");
    }
    const res = await api.put("/users/profile", userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
