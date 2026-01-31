import mongoose from "mongoose";

const admissionPartnerSchema = new mongoose.Schema({
  // Representative Information
  representativeName: { type: String, required: true },
  fathersName: { type: String, required: true },
  mothersName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  nationality: { type: String, required: true },
  roleInOrganisation: { type: String, required: true },
  educationQualification: { type: String, required: true },

  // Organisation Information
  organisationName: { type: String, required: true },
  yearOfEstablishment: { type: Number, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  organisationAddress: { type: String, required: true },
  organisationZipCode: { type: String, required: true },
  representativeAddress: { type: String, required: true },
  representativeZipCode: { type: String, required: true },
  organisationType: { type: String, required: true },

  // Industry Experience
  institutionsConnected: { type: String },
  achievementsAwards: { type: String },

  // Experience in Research Education
  totalStudentsEnrolled: { type: String },
  totalResearchPapers: { type: Number },
  fieldsOfResearch: { type: String },
  researchGuideDetails: { type: String },

  // Documents
  documents: [{
    filename: String,
    originalname: String,
    path: String,
    mimetype: String,
    size: Number
  }],

  // Section A: Institution Profile
  institutionDescription: [{ type: String }],
  corePhilosophy: { type: String },
  studentProfiles: [{ type: String }],

  // Section B: Experience with PhD Aspirants
  phdGuidanceFrequency: { type: String },
  phdServices: [{ type: String }],
  phdAspirantsVolume: { type: String },

  // Section C: Observed Student Challenges
  phdChallenges: [{ type: String }],
  discontinuationWitnessed: { type: String },
  missingElements: [{ type: String }],

  // Section D: Ethical Alignment
  ethicalBelief: { type: String },
  referralComfort: { type: String },
  recommendationFactors: [{ type: String }],

  // Section E: Collaboration Expectations
  collaborationInterests: [{ type: String }],
  collaborationRole: { type: String },
  collaborationApproach: { type: String },

  // Section F: Readiness & Quality Filter
  willingnessToDiscourage: { type: String },
  incentivePreference: { type: String },

  // Section G: Open Reflection
  phdAdmissionGap: { type: String },
  idealPhdSystem: { type: String },

  // Section H: Declaration & Consent
  declarationAgreed: { type: Boolean, default: false },
  informationCertified: { type: Boolean, default: false },
  rulesAgreed: { type: Boolean, default: false },

  // Metadata
  submittedAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'under_review', 'approved', 'rejected'], 
    default: 'pending' 
  },
  notes: { type: String },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  reviewedAt: { type: Date }
}, {
  timestamps: true
});

export default mongoose.model('AdmissionPartner', admissionPartnerSchema);