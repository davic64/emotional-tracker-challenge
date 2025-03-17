const express = require("express");
const router = express.Router();
const {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} = require("../controllers/reminderController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").post(protect, createReminder).get(protect, getReminders);

router
  .route("/:id")
  .put(protect, updateReminder)
  .delete(protect, deleteReminder);

module.exports = router;
