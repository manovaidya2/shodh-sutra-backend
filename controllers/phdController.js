import PhdAdmission from "../models/Phd.js";
import fs from "fs";

// APPLY
export const applyPhdAdmission = async (req, res) => {
  try {

    const formData = JSON.parse(req.body.formData);

    // FILE PATHS SAVE
    const files = req.files;

    formData.documentUploads = {
      tenthMarksheet: files.tenthMarksheet?.[0]?.path || null,
      twelfthMarksheet: files.twelfthMarksheet?.[0]?.path || null,
      graduationDegree: files.graduationDegree?.[0]?.path || null,
      pgDegree: files.pgDegree?.[0]?.path || null,
      idProof: files.idProof?.[0]?.path || null,
      passportPhoto: files.passportPhoto?.[0]?.path || null,
      cvResume: files.cvResume?.[0]?.path || null,
      researchProposal: files.researchProposal?.[0]?.path || null,
    };

    const newApplication = new PhdAdmission(formData);

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "PhD Admission Application Submitted",
      data: newApplication
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// GET ALL
export const getAllPhdAdmissions = async (req, res) => {

  try {

    const data = await PhdAdmission.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// GET SINGLE
export const getPhdAdmissionById = async (req, res) => {

  try {

    const data = await PhdAdmission.findById(req.params.id);

    if (!data)
      return res.status(404).json({
        success: false,
        message: "Application not found"
      });

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DELETE
export const deletePhdAdmission = async (req, res) => {

  try {

    const data = await PhdAdmission.findById(req.params.id);

    if (!data)
      return res.status(404).json({
        success: false,
        message: "Not found"
      });

    // DELETE FILES
    Object.values(data.documentUploads).forEach(file => {
      if (file && fs.existsSync(file))
        fs.unlinkSync(file);
    });

    await data.deleteOne();

    res.json({
      success: true,
      message: "Application deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
