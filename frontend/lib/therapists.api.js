import api from "./api";
import Cookie from "js-cookie";

export const getTherapist = async (id) => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      throw new Error("No se encontró el token de autenticación");
    }

    const response = await api.get(`/therapists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener el terapeuta:", error);
    throw error;
  }
};
