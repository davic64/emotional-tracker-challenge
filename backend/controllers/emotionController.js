const Emotion = require("../models/emotionModel");

// Get all emotions for a user
const getEmotions = async (req, res) => {
  const emotions = await Emotion.find({ user: req.user._id });
  res.json(emotions);
};

// Get single emotion by ID
const getEmotionById = async (req, res) => {
  const emotion = await Emotion.findById(req.params.id);

  if (!emotion) {
    res.status(404).json({ message: "Emotion not found" });
    return;
  }

  res.json(emotion);
};

// Create a new emotion entry
const createEmotion = async (req, res) => {
  const { emotion, intensity, notes } = req.body;

  const newEmotion = await Emotion.create({
    user: req.user._id,
    emotion,
    intensity,
    notes,
  });

  res.status(201).json(newEmotion);
};

// Update an emotion
const updateEmotion = async (req, res) => {
  const { emotion, intensity, notes } = req.body;

  const emotionRecord = await Emotion.findById(req.params.id);

  if (!emotionRecord) {
    res.status(404).json({ message: "Emotion not found" });
    return;
  }

  emotionRecord.emotion = emotion || emotionRecord.emotion;
  emotionRecord.intensity = intensity || emotionRecord.intensity;
  emotionRecord.notes = notes || emotionRecord.notes;

  const updatedEmotion = await emotionRecord.save();
  res.json(updatedEmotion);
};

const getEmotionSummary = async (userId) => {
  const aggregation = [
    {
      $match: {
        user: userId,
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        averageIntensity: { $avg: "$intensity" },
        emotionCounts: {
          $push: { $toInt: 1 },
        },
      },
    },
    {
      $project: {
        _id: 0,
        count: 1,
        averageIntensity: 1,
        emotionCounts: 1,
      },
    },
  ];

  const summary = await Emotion.aggregate(aggregation);
  return summary;
};

module.exports = {
  getEmotions,
  getEmotionById,
  createEmotion,
  updateEmotion,
  getEmotionSummary,
};
