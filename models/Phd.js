import mongoose from "mongoose";

const phdAdmissionSchema = new mongoose.Schema(
{
  applicantProfile: {
    fullName: String,
    fatherOrSpouseName: String,
    dob: Date,
    gender: String,
    mobile: String,
    email: String,
    cityState: String
  },

  academicQualification: {
    graduationDegree: String,
    graduationUniversity: String,
    graduationYear: String,
    graduationPercentage: String,
    postGraduationDegree: String,
    postGraduationUniversity: String,
    postGraduationYear: String,
    postGraduationPercentage: String,
    mode: String
  },

  professionalProfile: {
    currentRole: String,
    organization: String,
    industry: String,
    workExperience: String
  },

  phdOfferDetails: {
    entranceExamUniversity: String,
    entranceExamDate: Date,
    entranceResult: String,
    offeredStream: String,
    offeredStreamOther: String,
    proposedResearchArea: String,
    offeredUniversity: String,
    universityType: String,
    otherInstitution: String
  },

  feeStructure: {
    commonEntranceFee: String,
    totalPhdProgramFee: String
  },

  installmentStructure: {
    firstInstallment: Object,
    secondInstallment: Object,
    thirdInstallment: Object,
    fourthInstallment: Object,
    finalInstallment: Object
  },

  additionalFees: {
    fees: [String],
    details: String
  },

  documentUploads: {
    tenthMarksheet: String,
    twelfthMarksheet: String,
    graduationDegree: String,
    pgDegree: String,
    idProof: String,
    passportPhoto: String,
    cvResume: String,
    researchProposal: String
  },

  declaration: {
    consent: Boolean
  }

},
{ timestamps: true }
);

export default mongoose.model("PhdAdmission", phdAdmissionSchema);
