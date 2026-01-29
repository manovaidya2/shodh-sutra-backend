import multer from 'multer';
import path from 'path';
import fs from 'fs';
import ShodhSutraProfile from "../models/ShodhSutraProfile.js";

// Ensure uploads directory exists
const uploadDir = 'uploads/marksheets';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'marksheet-' + uniqueSuffix + ext);
  }
});

// Create multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, JPG, JPEG, PNG files are allowed'));
  }
});

// Middleware for file upload
const uploadMiddleware = upload.array('marksheets', 5); // Max 5 files

export const submitProfile = async (req, res) => {
  try {
    console.log("Starting profile submission...");
    
    // First, handle the file upload using multer
    uploadMiddleware(req, res, async function(err) {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      
      console.log("Received form data:", req.body);
      console.log("Received files:", req.files ? req.files.length : 0);
      
      // IMPORTANT: FormData से आने वाले fields को parse करें
      // ये fields req.body में directly available होंगे
      const {
        fullName,
        email,
        mobile,
        cityCountry,
        age,
        class10Board,
        class10Year,
        class10Percentage,
        class12Stream,
        class12Board,
        class12Year,
        class12Percentage,
        graduationDegree,
        graduationSpecialisation,
        graduationUniversity,
        graduationMode,
        graduationAdmissionYear,
        graduationPassingYear,
        graduationPercentage,
        pgStatus,
        pgDegree,
        pgSpecialisation,
        pgUniversity,
        pgAdmissionYear,
        pgPassingYear,
        pgMode,
        pgPercentage,
        professionalStatus,
        jobTitle,
        industry,
        organisation,
        firstJobYear,
        experienceYears,
        jobHistory,
        businessNature,
        businessStartYear,
        previousWork,
        currentRole,
        responsibilities,
        consultantExpertise,
        consultantExperience,
        consultantClients,
        academicInstitution,
        academicDesignation,
        academicSubjects,
        academicExperience,
        professionalGoals,
        blockers,
        underUtilised,
        authorityIncidents,
        phdWhy,
        phdBenefits,
        phdSeriousness,
        phdReason,
        nicheHelp,
        nicheExpertise,
        nicheIdeal,
        lifeLessons,
        heardFrom,
        expectations,
        phdHelp,
        sessionValue,
        weeklyHours,
        fears,
        honestAdvice
      } = req.body;

      // Validate required fields
      if (!email || !mobile || !fullName) {
        return res.status(400).json({
          success: false,
          message: "Name, Email and Mobile are required fields",
        });
      }

      // Prepare uploaded files data
      const uploadedFiles = [];
      if (req.files && req.files.length > 0) {
        req.files.forEach(file => {
          uploadedFiles.push({
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            path: file.path,
            url: `/uploads/marksheets/${file.filename}`
          });
        });
      }

      // Prepare profile data - सीधे fields use करें
      const profileData = {
        fullName: fullName,
        email: email,
        mobile: mobile,
        cityCountry: cityCountry || "",
        age: age || "",

        class10: {
          board: class10Board || "",
          year: class10Year || "",
          percentage: class10Percentage || "",
        },

        class12: {
          stream: class12Stream || "",
          board: class12Board || "",
          year: class12Year || "",
          percentage: class12Percentage || "",
        },

        graduation: {
          degree: graduationDegree || "",
          specialisation: graduationSpecialisation || "",
          university: graduationUniversity || "",
          mode: graduationMode || "",
          admissionYear: graduationAdmissionYear || "",
          passingYear: graduationPassingYear || "",
          percentage: graduationPercentage || "",
        },

        postGraduation: {
          status: pgStatus || "",
          degree: pgDegree || "",
          specialisation: pgSpecialisation || "",
          university: pgUniversity || "",
          admissionYear: pgAdmissionYear || "",
          passingYear: pgPassingYear || "",
          mode: pgMode || "",
          percentage: pgPercentage || "",
        },

        professionalStatus: professionalStatus || "",

        // Conditional professional details
        ...(professionalStatus === "Employed" && {
          employmentDetails: {
            jobTitle: jobTitle || "",
            industry: industry || "",
            organisation: organisation || "",
            firstJobYear: firstJobYear || "",
            experienceYears: experienceYears || "",
            jobHistory: jobHistory || "",
          }
        }),

        ...(professionalStatus === "Business" && {
          businessDetails: {
            nature: businessNature || "",
            startYear: businessStartYear || "",
            previousWork: previousWork || "",
            currentRole: currentRole || "",
            responsibilities: responsibilities || "",
          }
        }),

        ...(professionalStatus === "Consultant" && {
          consultantDetails: {
            expertise: consultantExpertise || "",
            yearsOfExperience: consultantExperience || "",
            clients: consultantClients || "",
          }
        }),

        ...(professionalStatus === "Academician" && {
          academicDetails: {
            institution: academicInstitution || "",
            designation: academicDesignation || "",
            subjects: academicSubjects || "",
            experienceYears: academicExperience || "",
          }
        }),

        // Uploaded files
        uploadedFiles: uploadedFiles,

        // Goals and blockers
        goals: professionalGoals || "",
        blockers: blockers || "",
        underUtilised: underUtilised || "",

        authorityIncidents: authorityIncidents || "",

        // PhD related
        phd: {
          why: phdWhy || "",
          benefits: phdBenefits || "",
          seriousness: parseInt(phdSeriousness) || 5,
          reason: phdReason || "",
        },

        // Niche and expertise
        niche: {
          helpWith: nicheHelp || "",
          expertise: nicheExpertise || "",
          ideal: nicheIdeal || "",
          lifeLessons: lifeLessons || "",
        },

        // Expectations
        expectations: {
          heardFrom: heardFrom || "",
          expectation: expectations || "",
          phdHelp: phdHelp || "",
          sessionValue: sessionValue || "",
        },

        // Commitment
        commitment: {
          weeklyHours: weeklyHours || "",
          fears: fears || "",
          honestAdvice: honestAdvice || "",
        },
      };

      console.log("Profile data to save:", JSON.stringify(profileData, null, 2));

      try {
        const profile = new ShodhSutraProfile(profileData);
        await profile.save();
        
        console.log("Profile saved successfully:", profile._id);

        res.status(201).json({
          success: true,
          message: "Profile submitted successfully!",
          data: {
            id: profile._id,
            fullName: profile.fullName,
            email: profile.email,
            professionalStatus: profile.professionalStatus,
            uploadedFiles: profile.uploadedFiles.length,
            submittedAt: profile.createdAt
          }
        });
      } catch (saveError) {
        console.error("Error saving to database:", saveError);
        
        // Duplicate email error handle करें
        if (saveError.code === 11000) {
          return res.status(400).json({
            success: false,
            message: "Email already exists. Please use a different email."
          });
        }
        
        res.status(500).json({
          success: false,
          message: "Failed to save profile to database",
          error: saveError.message,
        });
      }
    });
  } catch (error) {
    console.error("Unexpected error in submitProfile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process profile submission",
      error: error.message,
    });
  }
};

// Optional: Add a GET endpoint to fetch all profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await ShodhSutraProfile.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profiles",
      error: error.message,
    });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await ShodhSutraProfile
      .find({})
      .sort({ createdAt: -1 })
      .select("fullName email mobile createdAt professionalStatus");

    res.json({
      success: true,
      data: profiles,
    });
  } catch (err) {
    console.error("Error in getAllProfiles:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const profile = await ShodhSutraProfile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }
    res.json({ success: true, data: profile });
  } catch (err) {
    console.error("Error in getProfileById:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};