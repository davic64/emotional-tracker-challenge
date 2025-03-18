const Emotion = require("../models/emotionModel");
const mongoose = require("mongoose");

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
  const { emotion, intensity, notes, shared } = req.body;

  const emotionRecord = await Emotion.findById(req.params.id);

  if (!emotionRecord) {
    res.status(404).json({ message: "Emotion not found" });
    return;
  }

  emotionRecord.emotion = emotion || emotionRecord.emotion;
  emotionRecord.intensity = intensity || emotionRecord.intensity;
  emotionRecord.notes = notes || emotionRecord.notes;
  if (shared !== undefined) {
    emotionRecord.shared = shared;
  }

  const updatedEmotion = await emotionRecord.save();
  res.json(updatedEmotion);
};

const getEmotionSummary = async (req, res) => {
  try {
    const matchStage = {
      $match: {
        user: mongoose.Types.ObjectId(req.user._id),
      },
    };

    const aggregation = [
      matchStage,
      {
        $group: {
          _id: "$emotion",
          count: { $sum: 1 },
          averageIntensity: { $avg: "$intensity" },
        },
      },
      {
        $project: {
          emotion: "$_id",
          _id: 0,
          count: 1,
          averageIntensity: { $round: ["$averageIntensity", 1] },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $facet: {
          allEmotions: [{ $match: {} }],
          topEmotion: [{ $limit: 1 }],
        },
      },
      {
        $project: {
          summary: "$allEmotions",
          mostFrequent: { $arrayElemAt: ["$topEmotion", 0] },
        },
      },
    ];

    const summary = await Emotion.aggregate(aggregation);

    if (!summary.length) {
      return res.status(404).json({
        message: "No se encontraron registros de emociones para este período",
      });
    }

    res.json(summary);
  } catch (error) {
    console.error("Error en getEmotionSummary:", error);
    res.status(500).json({
      message: "Error al obtener el resumen de emociones",
      error: error.message,
    });
  }
};

module.exports = {
  getEmotions,
  getEmotionById,
  createEmotion,
  updateEmotion,
  getEmotionSummary,
};
