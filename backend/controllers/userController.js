const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey123";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    throw new Error("Invalid user data", { statusCode: 400 });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      ...(user.therapistId && { therapist: user.therapistId }),
    });
  } else {
    throw new Error("Invalid email or password", { statusCode: 401 });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    ...(user.therapistId && { therapist: user.therapistId }),
  });
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      ...(user.therapistId && { therapist: user.therapistId }),
    });
  } else {
    throw new Error("User not found", { statusCode: 404 });
  }
};

// Password reset endpoint
const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found", { statusCode: 404 });
  }

  user.password = password;
  await user.save();

  res.json({ message: "Password reset successful" });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
