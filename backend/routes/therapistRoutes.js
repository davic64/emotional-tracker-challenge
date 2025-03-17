const express = require("express");
const router = express.Router();
const { getTherapist } = require("../controllers/therapistController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/:id", protect, getTherapist);

module.exports = router;
