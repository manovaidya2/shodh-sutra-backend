import Scholarship from "../models/Scholarship.js";


// ================= APPLY =================
export const applyScholarship = async (req, res) => {

  try {

    /* ================= SANITIZE INPUT ================= */

    const data = {

      ...req.body,


      // ---------- PERSONAL ----------
      personalInfo: {
        ...req.body.personalInfo,

        dob: req.body.personalInfo?.dob
          ? new Date(req.body.personalInfo.dob)
          : null
      },


      // ---------- ACADEMIC ----------
      academicDetails: {
        ...req.body.academicDetails,

        yearOfPassing: req.body.academicDetails?.yearOfPassing
          ? Number(req.body.academicDetails.yearOfPassing)
          : null
      },


      // ---------- PROFESSIONAL ----------
      professionalDetails: {
        ...req.body.professionalDetails,

        workExperience:
          req.body.professionalDetails?.workExperience || null
      },


      // ---------- ELIGIBILITY ----------
      scholarshipEligibility:
        req.body.scholarshipEligibility || []
    };


    /* ================= VALIDATION ================= */

    if (!data.personalInfo?.fullName) {
      return res.status(400).json({
        success: false,
        message: "Full Name is required"
      });
    }

    if (!data.personalInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    if (!data.personalInfo?.mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile is required"
      });
    }

    if (!data.academicDetails?.highestQualification) {
      return res.status(400).json({
        success: false,
        message: "Qualification is required"
      });
    }

    if (!data.academicDetails?.university) {
      return res.status(400).json({
        success: false,
        message: "University is required"
      });
    }

    if (!data.proposedSubject) {
      return res.status(400).json({
        success: false,
        message: "Proposed Subject is required"
      });
    }

    if (!data.statementOfNeed) {
      return res.status(400).json({
        success: false,
        message: "Statement is required"
      });
    }

    if (!data.declaration?.consent) {
      return res.status(400).json({
        success: false,
        message: "Please accept declaration"
      });
    }


    /* ================= SAVE ================= */

    const application = new Scholarship(data);

    await application.save();


    res.status(201).json({
      success: true,
      message: "Scholarship Applied Successfully ✅",
      data: application
    });

  } catch (error) {

    console.error("🔥 SCHOLARSHIP BACKEND ERROR:", error);


    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error"
    });
  }
};



// ================= GET ALL =================
export const getAllApplications = async (req, res) => {

  try {

    const apps = await Scholarship.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: apps.length,
      data: apps
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};



// ================= GET SINGLE =================
export const getSingleApplication = async (req, res) => {

  try {

    const app = await Scholarship.findById(req.params.id);

    if (!app) {
      return res.status(404).json({
        success: false,
        message: "Not Found"
      });
    }

    res.json({
      success: true,
      data: app
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Invalid ID"
    });
  }
};