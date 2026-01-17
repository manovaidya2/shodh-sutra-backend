import Consultation from "../models/Consultation.js";

export const createConsultation = async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const data = await Consultation.create({
      fullName,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Consultation Saved",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllConsultations = async (req, res) => {
  try {
    const data = await Consultation.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
