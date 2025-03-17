const Therapist = require("../models/therapistModel");

const getTherapist = async (req, res) => {
  const { id } = req.params;
  const therapist = await Therapist.findById(id);
  res.status(200).json(therapist);
};

module.exports = { getTherapist };
