import Mentor from "../models/Mentor.js";
import fs from "fs";


/* ================= SUBMIT ================= */
export const submitMentor = async (req, res) => {

  try {

    const body = req.body;


    /* ---------- JSON PARSE ---------- */
    const parseJSON = (val) => {
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    };

    Object.keys(body).forEach((key) => {
      body[key] = parseJSON(body[key]);
    });


    /* ---------- FILES ---------- */

    // Research PDFs
    let researchFiles = [];

    if (req.files?.researchFiles) {
      researchFiles = req.files.researchFiles.map(
        (file) => file.path
      );
    }


    // Signature
    let signatureFile = "";

    if (req.files?.signatureFile) {
      signatureFile = req.files.signatureFile[0].path;
    }


    /* ---------- CREATE DOCUMENT ---------- */

    const mentor = new Mentor({

      basicInfo: body.basicInfo,
      personalInfo: body.personalInfo,
      contactInfo: body.contactInfo,
      educationInfo: body.educationInfo,

      professionalInfo: body.professionalInfo,
      researchInfo: body.researchInfo,

      mentorIdentity: body.mentorIdentity || [],
      studentInteraction: body.studentInteraction || [],
      challengesSection: body.challengesSection || [],
      incidentsSection: body.incidentsSection || [],
      mentorRoleSection: body.mentorRoleSection || [],
      collaborationSection: body.collaborationSection || [],
      intentSection: body.intentSection || [],
      reflectionSection: body.reflectionSection || [],

      consent: body.consent,

      researchFiles,
      signatureFile

    });


    await mentor.save();


    res.status(201).json({
      success: true,
      message: "Mentor profile submitted successfully"
    });

  } catch (err) {

    console.error("Submit Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }

};




export const getAllMentors = async (req, res) => {
  try {

    const mentors = await Mentor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: mentors
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


/* ================= GET SINGLE MENTOR ================= */
export const getMentorById = async (req, res) => {
  try {

    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found"
      });
    }

    res.status(200).json({
      success: true,
      data: mentor
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


/* ================= DELETE MENTOR ================= */
export const deleteMentor = async (req, res) => {

  try {

    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found"
      });
    }


    /* ----- Delete Research Files ----- */
    if (mentor.researchFiles?.length) {

      for (const filePath of mentor.researchFiles) {

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

      }
    }


    /* ----- Delete Signature ----- */
    if (mentor.signatureFile) {

      if (fs.existsSync(mentor.signatureFile)) {
        fs.unlinkSync(mentor.signatureFile);
      }

    }


    await Mentor.findByIdAndDelete(req.params.id);


    res.status(200).json({
      success: true,
      message: "Mentor deleted successfully"
    });

  } catch (err) {

    console.error("Delete Error:", err);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }

};
