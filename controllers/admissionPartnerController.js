// import AdmissionPartner from "../models/AdmissionPartner.js";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Submit admission partner application
// export const submitApplication = async (req, res) => {
//   try {
//     const formData = req.body;
//     const files = req.files || [];

//     // Parse array fields
//     const parseArrayField = (field) => {
//       if (typeof field === 'string') {
//         try {
//           return JSON.parse(field);
//         } catch {
//           return field.split(',').map(item => item.trim());
//         }
//       }
//       return field || [];
//     };

//     // Prepare document data
//     const applicationData = {
//       // Representative Information
//       representativeName: formData.representativeName,
//       fathersName: formData.fathersName,
//       mothersName: formData.mothersName,
//       dateOfBirth: formData.dateOfBirth,
//       gender: formData.gender,
//       nationality: formData.nationality,
//       roleInOrganisation: formData.roleInOrganisation,
//       educationQualification: formData.educationQualification,

//       // Organisation Information
//       organisationName: formData.organisationName,
//       yearOfEstablishment: parseInt(formData.yearOfEstablishment),
//       mobileNumber: formData.mobileNumber,
//       email: formData.email,
//       organisationAddress: formData.organisationAddress,
//       organisationZipCode: formData.organisationZipCode,
//       representativeAddress: formData.representativeAddress,
//       representativeZipCode: formData.representativeZipCode,
//       organisationType: formData.organisationType,

//       // Industry Experience
//       institutionsConnected: formData.institutionsConnected,
//       achievementsAwards: formData.achievementsAwards,

//       // Experience in Research Education
//       totalStudentsEnrolled: formData.totalStudentsEnrolled,
//       totalResearchPapers: parseInt(formData.totalResearchPapers) || 0,
//       fieldsOfResearch: formData.fieldsOfResearch,
//       researchGuideDetails: formData.researchGuideDetails,

//       // Documents
//       documents: files.map(file => ({
//         filename: file.filename,
//         originalname: file.originalname,
//         path: file.path,
//         mimetype: file.mimetype,
//         size: file.size
//       })),

//       // Section A
//       institutionDescription: parseArrayField(formData.institutionDescription),
//       corePhilosophy: formData.corePhilosophy,
//       studentProfiles: parseArrayField(formData.studentProfiles),

//       // Section B
//       phdGuidanceFrequency: formData.phdGuidanceFrequency,
//       phdServices: parseArrayField(formData.phdServices),
//       phdAspirantsVolume: formData.phdAspirantsVolume,

//       // Section C
//       phdChallenges: parseArrayField(formData.phdChallenges),
//       discontinuationWitnessed: formData.discontinuationWitnessed,
//       missingElements: parseArrayField(formData.missingElements),

//       // Section D
//       ethicalBelief: formData.ethicalBelief,
//       referralComfort: formData.referralComfort,
//       recommendationFactors: parseArrayField(formData.recommendationFactors),

//       // Section E
//       collaborationInterests: parseArrayField(formData.collaborationInterests),
//       collaborationRole: formData.collaborationRole,
//       collaborationApproach: formData.collaborationApproach,

//       // Section F
//       willingnessToDiscourage: formData.willingnessToDiscourage,
//       incentivePreference: formData.incentivePreference,

//       // Section G
//       phdAdmissionGap: formData.phdAdmissionGap,
//       idealPhdSystem: formData.idealPhdSystem,

//       // Section H & Consent
//       declarationAgreed: formData.declarationAgreed === 'true',
//       informationCertified: formData.informationCertified === 'true',
//       rulesAgreed: formData.rulesAgreed === 'true'
//     };

//     const application = new AdmissionPartner(applicationData);
//     await application.save();

//     res.status(201).json({
//       success: true,
//       message: 'Application submitted successfully!',
//       data: {
//         applicationId: application._id,
//         referenceNumber: `AP${Date.now().toString().slice(-8)}`
//       }
//     });

//   } catch (error) {
//     console.error('Error submitting application:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error submitting application',
//       error: error.message
//     });
//   }
// };

// // Get all applications (for admin)
// export const getAllApplications = async (req, res) => {
//   try {
//     const applications = await AdmissionPartner.find()
//       .sort({ createdAt: -1 })
//       .select('-__v');

//     res.status(200).json({
//       success: true,
//       count: applications.length,
//       data: applications
//     });
//   } catch (error) {
//     console.error('Error fetching applications:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching applications',
//       error: error.message
//     });
//   }
// };

// // Get single application by ID
// export const getApplicationById = async (req, res) => {
//   try {
//     const application = await AdmissionPartner.findById(req.params.id)
//       .select('-__v');

//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Application not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: application
//     });
//   } catch (error) {
//     console.error('Error fetching application:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error fetching application',
//       error: error.message
//     });
//   }
// };

// // Update application status (for admin)
// export const updateApplicationStatus = async (req, res) => {
//   try {
//     const { status, notes } = req.body;
//     const adminId = req.user?.id; // Assuming you have auth middleware

//     const application = await AdmissionPartner.findById(req.params.id);
    
//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Application not found'
//       });
//     }

//     application.status = status;
//     if (notes) application.notes = notes;
//     if (adminId) application.reviewedBy = adminId;
//     application.reviewedAt = Date.now();

//     await application.save();

//     res.status(200).json({
//       success: true,
//       message: 'Application status updated successfully',
//       data: application
//     });
//   } catch (error) {
//     console.error('Error updating application status:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error updating application status',
//       error: error.message
//     });
//   }
// };

// // Download document
// export const downloadDocument = async (req, res) => {
//   try {
//     const application = await AdmissionPartner.findById(req.params.id);
    
//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Application not found'
//       });
//     }

//     const document = application.documents.id(req.params.docId);
    
//     if (!document) {
//       return res.status(404).json({
//         success: false,
//         message: 'Document not found'
//       });
//     }

//     const filePath = path.join(__dirname, '..', document.path);
    
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({
//         success: false,
//         message: 'File not found on server'
//       });
//     }

//     res.download(filePath, document.originalname);
//   } catch (error) {
//     console.error('Error downloading document:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error downloading document',
//       error: error.message
//     });
//   }
// };

// // Delete application (for admin)
// export const deleteApplication = async (req, res) => {
//   try {
//     const application = await AdmissionPartner.findById(req.params.id);
    
//     if (!application) {
//       return res.status(404).json({
//         success: false,
//         message: 'Application not found'
//       });
//     }

//     // Delete associated files
//     application.documents.forEach(doc => {
//       const filePath = path.join(__dirname, '..', doc.path);
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }
//     });

//     await application.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: 'Application deleted successfully'
//     });
//   } catch (error) {
//     console.error('Error deleting application:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Error deleting application',
//       error: error.message
//     });
//   }
// };







import AdmissionPartner from "../models/AdmissionPartner.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Submit admission partner application
export const submitApplication = async (req, res) => {
  try {
    const formData = req.body;
    const files = req.files || [];

    console.log("Form data received:", Object.keys(formData));

    // Parse array fields properly
    const parseArrayField = (field) => {
      if (!field) return [];
      if (typeof field === 'string') {
        try {
          // Try to parse as JSON first
          const parsed = JSON.parse(field);
          return Array.isArray(parsed) ? parsed : [parsed];
        } catch (err) {
          // If not valid JSON, split by comma
          if (field.includes(',')) {
            return field.split(',').map(item => item.trim()).filter(item => item !== '');
          }
          // If single value
          return field ? [field] : [];
        }
      }
      if (Array.isArray(field)) {
        return field;
      }
      return [];
    };

    // Convert boolean strings
    const convertToBoolean = (value) => {
      if (typeof value === 'string') {
        return value.toLowerCase() === 'true' || value === '1' || value === 'on' || value === 'yes';
      }
      return Boolean(value);
    };

    // Prepare application data with proper validation
    const applicationData = {
      // Representative Information
      representativeName: formData.representativeName?.trim() || '',
      fathersName: formData.fathersName?.trim() || '',
      mothersName: formData.mothersName?.trim() || '',
      dateOfBirth: formData.dateOfBirth || null,
      gender: formData.gender || '',
      nationality: formData.nationality?.trim() || '',
      roleInOrganisation: formData.roleInOrganisation?.trim() || '',
      educationQualification: formData.educationQualification?.trim() || '',

      // Organisation Information
      organisationName: formData.organisationName?.trim() || '',
      yearOfEstablishment: parseInt(formData.yearOfEstablishment) || 0,
      mobileNumber: formData.mobileNumber?.trim() || '',
      email: (formData.email || '').toLowerCase().trim(),
      organisationAddress: formData.organisationAddress?.trim() || '',
      organisationZipCode: formData.organisationZipCode?.trim() || '',
      representativeAddress: formData.representativeAddress?.trim() || '',
      representativeZipCode: formData.representativeZipCode?.trim() || '',
      organisationType: formData.organisationType || '',

      // Industry Experience
      institutionsConnected: formData.institutionsConnected?.trim() || '',
      achievementsAwards: formData.achievementsAwards?.trim() || '',

      // Experience in Research Education
      totalStudentsEnrolled: formData.totalStudentsEnrolled?.trim() || '',
      totalResearchPapers: parseInt(formData.totalResearchPapers) || 0,
      fieldsOfResearch: formData.fieldsOfResearch?.trim() || '',
      researchGuideDetails: formData.researchGuideDetails?.trim() || '',

      // Documents
      documents: files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size
      })),

      // Section A: Institution Profile
      institutionDescription: parseArrayField(formData.institutionDescription),
      corePhilosophy: formData.corePhilosophy || '',
      studentProfiles: parseArrayField(formData.studentProfiles),

      // Section B: Experience with PhD Aspirants
      phdGuidanceFrequency: formData.phdGuidanceFrequency || '',
      phdServices: parseArrayField(formData.phdServices),
      phdAspirantsVolume: formData.phdAspirantsVolume || '',

      // Section C: Observed Student Challenges
      phdChallenges: parseArrayField(formData.phdChallenges),
      discontinuationWitnessed: formData.discontinuationWitnessed || '',
      missingElements: parseArrayField(formData.missingElements),

      // Section D: Ethical Alignment
      ethicalBelief: formData.ethicalBelief || '',
      referralComfort: formData.referralComfort || '',
      recommendationFactors: parseArrayField(formData.recommendationFactors),

      // Section E: Collaboration Expectations
      collaborationInterests: parseArrayField(formData.collaborationInterests),
      collaborationRole: formData.collaborationRole || '',
      collaborationApproach: formData.collaborationApproach || '',

      // Section F: Readiness & Quality Filter
      willingnessToDiscourage: formData.willingnessToDiscourage || '',
      incentivePreference: formData.incentivePreference || '',

      // Section G: Open Reflection
      phdAdmissionGap: formData.phdAdmissionGap || '',
      idealPhdSystem: formData.idealPhdSystem || '',

      // Section H: Declaration & Consent
      declarationAgreed: convertToBoolean(formData.declarationAgreed),
      informationCertified: convertToBoolean(formData.informationCertified),
      rulesAgreed: convertToBoolean(formData.rulesAgreed),

      // Metadata
      status: 'pending'
    };

    console.log("Creating application with data:", {
      representativeName: applicationData.representativeName,
      email: applicationData.email,
      documentsCount: applicationData.documents.length
    });

    const application = new AdmissionPartner(applicationData);
    await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: {
        applicationId: application._id,
        referenceNumber: `AP${Date.now().toString().slice(-8)}${application._id.toString().slice(-4)}`
      }
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error.message
    });
  }
};

// Get all applications with search and filter
export const getAllApplications = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    
    let filter = {};
    
    // Filter by status if provided
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    // Search functionality
    if (search) {
      filter.$or = [
        { representativeName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { organisationName: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const applications = await AdmissionPartner.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v');

    const total = await AdmissionPartner.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: applications.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message
    });
  }
};

// Get single application by ID with full details
export const getApplicationById = async (req, res) => {
  try {
    const application = await AdmissionPartner.findById(req.params.id)
      .select('-__v');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    res.status(200).json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching application',
      error: error.message
    });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const application = await AdmissionPartner.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    application.status = status;
    if (notes !== undefined) application.notes = notes;
    application.reviewedAt = new Date();

    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating application status',
      error: error.message
    });
  }
};

// Download document with proper path handling
export const downloadDocument = async (req, res) => {
  try {
    const application = await AdmissionPartner.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    const document = application.documents.id(req.params.docId);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    // Fix path - remove any leading slashes or dots
    let filePath = document.path;
    if (filePath.startsWith('./')) {
      filePath = filePath.substring(2);
    }
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1);
    }

    const fullPath = path.join(process.cwd(), filePath);
    
    console.log('Looking for file at:', fullPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log('File not found, checking uploads directory...');
      // Try alternative path
      const altPath = path.join(process.cwd(), 'uploads', 'admission-partners', path.basename(filePath));
      if (fs.existsSync(altPath)) {
        res.download(altPath, document.originalname);
        return;
      }
      return res.status(404).json({
        success: false,
        message: 'File not found on server'
      });
    }

    res.download(fullPath, document.originalname);
  } catch (error) {
    console.error('Error downloading document:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading document',
      error: error.message
    });
  }
};

// Delete application
export const deleteApplication = async (req, res) => {
  try {
    const application = await AdmissionPartner.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    // Delete associated files
    application.documents.forEach(doc => {
      try {
        let filePath = doc.path;
        if (filePath.startsWith('./')) {
          filePath = filePath.substring(2);
        }
        if (filePath.startsWith('/')) {
          filePath = filePath.substring(1);
        }
        
        const fullPath = path.join(process.cwd(), filePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      } catch (err) {
        console.error('Error deleting file:', err);
      }
    });

    await application.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting application',
      error: error.message
    });
  }
};