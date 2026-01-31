import multer from 'multer';
import path from 'path';
import fs from 'fs';
import ShodhSutraProfile from "../models/ShodhSutraProfile.js";

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store files in different folders based on field name
    if (file.fieldname === 'marksheets') {
      const dir = 'uploads/marksheets/';
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    } else if (file.fieldname === 'researchPapers') {
      const dir = 'uploads/research/';
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + ext;
    console.log(`Saving file: ${filename} for field: ${file.fieldname}`);
    cb(null, filename);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  const filetypes = /pdf|jpg|jpeg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only PDF, JPG, JPEG, PNG files are allowed'));
};

// Create multer instance with multiple field support
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 10 // Total max files
  },
  fileFilter: fileFilter
});

// Use fields middleware to accept multiple field types
const uploadMiddleware = upload.fields([
  { name: 'marksheets', maxCount: 5 },
  { name: 'researchPapers', maxCount: 5 }
]);

export const submitProfile = async (req, res) => {
  try {
    console.log("Starting profile submission...");
    
    // Handle the file upload using multer
    uploadMiddleware(req, res, async function(err) {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      
      console.log("Received form data fields:", Object.keys(req.body));
      console.log("Received files:", {
        marksheets: req.files?.marksheets?.length || 0,
        researchPapers: req.files?.researchPapers?.length || 0
      });
      
      // Parse form data
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
        totalResearchPapers,
        otherUniversityResearch,
        otherUniversitySession,
        existingResearch,
        seminarsAttended,
        researchFields,
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
      if (!email || !mobile || !fullName || !professionalStatus) {
        return res.status(400).json({
          success: false,
          message: "Name, Email, Mobile and Professional Status are required fields",
        });
      }

      // Prepare research documents
      const researchDocs = [];
      if (req.files?.researchPapers) {
        req.files.researchPapers.forEach(file => {
          researchDocs.push({
            filename: file.filename,
            originalName: file.originalname,
            path: file.path,
            size: file.size,
            mimeType: file.mimetype,
            url: `/uploads/research/${file.filename}`,
            uploadedAt: new Date()
          });
        });
      }

      // Prepare uploaded marksheets/certificates
      const uploadedFiles = [];
      if (req.files?.marksheets) {
        req.files.marksheets.forEach(file => {
          uploadedFiles.push({
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            path: file.path,
            url: `/uploads/marksheets/${file.filename}`,
            uploadedAt: new Date()
          });
        });
      }

      // Prepare profile data
      const profileData = {
        fullName: fullName || "",
        email: email || "",
        mobile: mobile || "",
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

        research: {
          totalPapers: totalResearchPapers || "",
          otherUniversity: otherUniversityResearch || "",
          session: otherUniversitySession || "",
          existingResearch: existingResearch || "",
          seminars: seminarsAttended || "",
          fields: researchFields || "",
          documents: researchDocs
        },

        
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

        // Metadata
        formStatus: 'submitted',
        submissionIp: req.ip,
        userAgent: req.get('User-Agent')
      };

      console.log("Saving profile to database...");

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
            marksheets: profile.uploadedFiles.length,
            researchPapers: profile.research?.documents?.length || 0,
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

// Get all profiles with pagination
export const getProfiles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const profiles = await ShodhSutraProfile.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ShodhSutraProfile.countDocuments();

    res.status(200).json({
      success: true,
      count: profiles.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
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