import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({

  personalInfo: {
    fullName: { type: String, required: true, trim: true },

    dob: {
      type: Date,
      default: null
    },

    gender: String,

    mobile: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    permanentAddress: String
  },


  academicDetails: {
    highestQualification: {
      type: String,
      required: true
    },

    university: {
      type: String,
      required: true
    },

    yearOfPassing: {
      type: Number,
      default: null
    },

    percentage: String
  },


  proposedSubject: {
    type: String,
    required: true,
    trim: true
  },


  professionalDetails: {
    employmentStatus: String,
    otherStatus: String,
    organization: String,
    designation: String,

    workExperience: {
      type: String,
      default: null
    }
  },


  scholarshipEligibility: {
    type: [String],
    default: []
  },


  researchBackground: {
    hasPublished: String,
    publicationDetails: String,
    hasAttended: String,
    conferenceDetails: String,
    researchInterest: String
  },


  statementOfNeed: {
    type: String,
    required: true
  },


  declaration: {
    consent: {
      type: Boolean,
      default: false
    }
  }

}, {
  timestamps: true
});


export default mongoose.model("Scholarship", scholarshipSchema);