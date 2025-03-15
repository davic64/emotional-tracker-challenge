import api from "./api";
import Cookie from "js-cookie";

// Get all emotions
export const getEmotions = async (token) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("/emotions", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting emotions:", error);
    throw error;
  }
};

// Add a new emotion
export const addEmotion = async (emotionData) => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      throw new Error("No token found");
    }

    const newEmotion = {
      id: Date.now().toString(),
      ...emotionData,
      date: new Date().toISOString(),
    };

    const response = await api.post("/emotions", newEmotion, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding emotion:", error);
    throw error;
  }
};

// Summarize emotions
export const summarizeEmotions = async () => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("/emotions/summary", {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        groupBy: "emotion",
        calculate: ["count", "averageIntensity"],
        include: ["emotionCounts"],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error summarizing emotions:", error.message || error);
    throw error;
  }
};
