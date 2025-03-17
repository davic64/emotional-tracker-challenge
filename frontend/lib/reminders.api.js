import api from "./api";
import Cookie from "js-cookie";

// Get all reminders
export const getReminders = async (token) => {
  try {
    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.get("/reminders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting reminders:", error);
    throw error;
  }
};

// Add a new reminder
export const addReminder = async (reminderData) => {
  try {
    const token = Cookie.get("token");

    if (!token) {
      throw new Error("No token found");
    }

    const newReminder = {
      id: Date.now().toString(),
      ...reminderData,
      date: new Date().toISOString(),
    };

    const response = await api.post("/reminders", newReminder, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding reminder:", error);
    throw error;
  }
};

// Update a reminder
export const updateReminder = async (reminderId, reminderData) => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      throw new Error("No token found");
    }

    const response = await api.put(`/reminders/${reminderId}`, reminderData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating reminder:", error);
    throw error;
  }
};

// Delete a reminder
export const deleteReminder = async (reminderId) => {
  try {
    const token = Cookie.get("token");
    if (!token) {
      throw new Error("No token found");
    }

    await api.delete(`/reminders/${reminderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    throw error;
  }
};
