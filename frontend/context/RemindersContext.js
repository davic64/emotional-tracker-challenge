import { createContext, useState } from "react";
import {
  addReminder,
  updateReminder,
  deleteReminder,
} from "../lib/reminders.api";

export const RemindersContext = createContext();

export const RemindersProvider = ({ children }) => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reminderToEdit, setReminderToEdit] = useState(null);

  const setInitialReminders = (data) => setReminders(data);

  const newReminder = async (reminderData) => {
    setLoading(true);
    const reminder = await addReminder(reminderData);
    setReminders((prev) => [reminder, ...prev]);
    setLoading(false);
  };

  const updateReminderContext = async (reminderId, reminderData) => {
    setLoading(true);
    const reminder = await updateReminder(reminderId, reminderData);
    setReminders((prev) =>
      prev.map((r) => (r._id === reminderId ? reminder : r))
    );
    setLoading(false);
  };

  const deleteReminderContext = async (reminderId) => {
    setLoading(true);
    await deleteReminder(reminderId);
    setReminders((prev) => prev.filter((r) => r._id !== reminderId));
    setLoading(false);
  };

  return (
    <RemindersContext.Provider
      value={{
        reminders,
        loading,
        setInitialReminders,
        newReminder,
        updateReminderContext,
        deleteReminderContext,
        reminderToEdit,
        setReminderToEdit,
      }}
    >
      {children}
    </RemindersContext.Provider>
  );
};
