import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema({

  /* ================= BASIC INFO ================= */
  basicInfo: {
    areaOfResearch: String,
    institution: String,
    department: String,
    batch: String,
  },

  /* ================= PERSONAL INFO ================= */
  personalInfo: {
    name: String,
    father: String,
    mother: String,
    dob: Date,
    gender: String,
    blood: String,
    nationality: String,
  },

  /* ================= CONTACT INFO ================= */
  contactInfo: {
    mobile: String,
    email: String,

    presentAddress: String,
    presentZip: String,

    permanentAddress: String,
    permanentZip: String,
  },


  /* ================= EDUCATION ================= */
  educationInfo: {
    class10Board: String,
    class10Grade: String,
    class10Year: String,

    class12Board: String,
    class12Grade: String,
    class12Year: String,

    gradBoard: String,
    gradGrade: String,
    gradYear: String,

    pgBoard: String,
    pgGrade: String,
    pgYear: String,

    phdBoard: String,
    phdGrade: String,
    phdYear: String,
  },


  /* ================= PROFESSIONAL ================= */
  professionalInfo: {
    profession: String,
    experience: String,
    companies: String,
    achievements: String,
  },


  /* ================= RESEARCH ================= */
  researchInfo: {
    thesis: String,
    papers: String,
    fields: String,
    seminars: String,
  },


  /* ================= QUESTIONS ================= */

  mentorIdentity: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed
    }
  ],

  studentInteraction: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed
    }
  ],

  challengesSection: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed
    }
  ],

  incidentsSection: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed
    }
  ],

  mentorRoleSection: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed
    }
  ],

  collaborationSection: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed
    }
  ],

  intentSection: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed
    }
  ],

  reflectionSection: [
    {
      question: String,
      answer: mongoose.Schema.Types.Mixed
    }
  ],


  /* ================= CONSENT ================= */
  consent: {
    type: Boolean,
    default: false
  },


  /* ================= FILES ================= */
  researchFiles: [String],
  signatureFile: String,


  /* ================= TIMESTAMP ================= */
  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Mentor", mentorSchema);
