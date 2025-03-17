const Reminder = require("../models/reminderModel");

// Create a new reminder
const createReminder = async (req, res) => {
  const { title, time, category } = req.body;

  const reminder = new Reminder({
    user: req.user._id,
    title,
    time,
    category,
  });

  await reminder.save();
  res.status(201).json(reminder);
};

// Get all reminders for a user
const getReminders = async (req, res) => {
  const reminders = await Reminder.find({ user: req.user._id });
  res.json(reminders);
};

// Update a reminder
const updateReminder = async (req, res) => {
  const updateData = req.body;

  const reminder = await Reminder.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true }
  );

  if (!reminder) {
    res.status(404).json({ message: "Recordatorio no encontrado" });
    return;
  }

  res.json(reminder);
};

// Delete a reminder
const deleteReminder = async (req, res) => {
  const reminder = await Reminder.findByIdAndDelete(req.params.id);

  if (!reminder) {
    res.status(404).json({ message: "Reminder not found" });
    return;
  }

  res.json({ message: "Reminder deleted successfully" });
};

module.exports = {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
};
