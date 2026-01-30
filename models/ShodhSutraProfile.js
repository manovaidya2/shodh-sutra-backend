import mongoose from "mongoose";

const ShodhSutraSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    cityCountry: String,
    age: String,

    class10: {
      board: String,
      year: String,
      percentage: String,
    },

    class12: {
      stream: String,
      board: String,
      year: String,
      percentage: String,
    },

    graduation: {
      degree: String,
      specialisation: String,
      university: String,
      mode: String,
      admissionYear: String,
      passingYear: String,
      percentage: String,
    },

    postGraduation: {
      status: String,
      degree: String,
      specialisation: String,
      university: String,
      admissionYear: String,
      passingYear: String,
      mode: String,
      percentage: String,
    },

    professionalStatus: { type: String, required: true },

    // Conditional fields based on professional status
    employmentDetails: {
      jobTitle: String,
      industry: String,
      organisation: String,
      firstJobYear: String,
      experienceYears: String,
      jobHistory: String,
    },

    businessDetails: {
      nature: String,
      startYear: String,
      previousWork: String,
      currentRole: String,
      responsibilities: String,
    },

    consultantDetails: {
      expertise: String,
      yearsOfExperience: String,
      clients: String,
    },

    academicDetails: {
      institution: String,
      designation: String,
      subjects: String,
      experienceYears: String,
    },

    research: {
      totalPapers: String,
      otherUniversity: String,
      session: String,
      existingResearch: String,
      seminars: String,
      fields: String,
      documents: [
        {
          filename: String,
          originalName: String,
          path: String,
          size: Number,
          mimeType: String,
          url: String,
          uploadedAt: { type: Date, default: Date.now }
        }
      ]
    },

    // Uploaded files
    uploadedFiles: [
      {
        filename: { type: String, required: true },
        originalName: { type: String, required: true },
        mimeType: { type: String, required: true },
        size: { type: Number, required: true },
        path: { type: String, required: true },
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now }
      }
    ],

    // Goals and blockers
    goals: String,
    blockers: String,
    underUtilised: String,

    authorityIncidents: String,

    // PhD related
    phd: {
      why: String,
      benefits: String,
      seriousness: { type: Number, min: 1, max: 10 },
      reason: String,
    },

    // Niche and expertise
    niche: {
      helpWith: String,
      expertise: String,
      ideal: String,
      lifeLessons: String,
    },

    // Expectations
    expectations: {
      heardFrom: String,
      expectation: String,
      phdHelp: String,
      sessionValue: String,
    },

    // Commitment
    commitment: {
      weeklyHours: String,
      fears: String,
      honestAdvice: String,
    },

    // Form submission metadata
    formStatus: { 
      type: String, 
      enum: ['draft', 'submitted'], 
      default: 'submitted' 
    },
    submissionIp: String,
    userAgent: String,
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster queries
ShodhSutraSchema.index({ email: 1 });
ShodhSutraSchema.index({ mobile: 1 });
ShodhSutraSchema.index({ professionalStatus: 1 });
ShodhSutraSchema.index({ createdAt: -1 });

// Virtual for formatted date
ShodhSutraSchema.virtual('submissionDate').get(function() {
  return this.createdAt.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
});

export default mongoose.model("ShodhSutraProfile", ShodhSutraSchema);