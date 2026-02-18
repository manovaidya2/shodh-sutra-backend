// models/University.js
import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
  // Section 1: University Identity
  officialName: {
    type: String,
    required: [true, 'University name is required'],
    trim: true
  },
  universityType: {
    type: String,
    required: true,
    enum: [
      'Central University',
      'State University',
      'Deemed-to-be University',
      'Private University',
      'International University',
      'Research Institution'
    ]
  },
  yearOfEstablishment: {
    type: Number,
    required: true,
    min: 1800,
    max: new Date().getFullYear()
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  recognitionStatus: [{
    type: String,
    enum: [
      'UGC Recognised',
      'AICTE Approved',
      'Both',
      'International Accreditation',
      'Other Council'
    ]
  }],

  // Section 2: Academic & Research Ecosystem
  hasPhdProgram: {
    type: Boolean,
    required: true
  },
  phdDisciplines: [{
    type: String,
    enum: [
      'Management',
      'Education',
      'Psychology',
      'Law',
      'Commerce / Finance',
      'Engineering / Technology',
      'Health Sciences',
      'Social Sciences',
      'Interdisciplinary Research',
      'Other'
    ]
  }],
  otherDiscipline: {
    type: String,
    trim: true
  },
  phdModes: [{
    type: String,
    enum: [
      'Full-time',
      'Part-time',
      'For working professionals',
      'International scholars',
      'Other'
    ]
  }],
  otherMode: {
    type: String,
    trim: true
  },
  averageScholars: {
    type: String,
    enum: ['Below 50', '50–100', '101–300', '300+']
  },

  // Section 3: Research Guidance & Support System
  phdGuideCount: {
    type: String,
    enum: ['Below 25', '25–50', '51–100', '100+']
  },
  supportSystems: [{
    type: String,
    enum: [
      'Research methodology coursework',
      'Proposal review committee',
      'Periodic progress reviews',
      'Publication guidance',
      'Thesis formatting & submission support',
      'Mentor / guide interaction structure'
    ]
  }],
  timelineTracking: {
    type: String,
    enum: ['Yes, actively', 'Partially', 'No']
  },

  // Section 4: Observed Challenges
  phdChallenges: [{
    type: String,
    enum: [
      'Delay in topic finalisation',
      'Scholar–guide misalignment',
      'Lack of research clarity',
      'Time-management issues (working professionals)',
      'Dropouts / long delays',
      'Publication-related challenges'
    ]
  }],
  completionImportance: {
    type: String,
    enum: ['Extremely important', 'Important', 'Moderately important', 'Not a priority']
  },

  // Section 5: Admission & Onboarding
  onboardingMethods: [{
    type: String,
    enum: [
      'Entrance test',
      'Interview',
      'Profile-based assessment',
      'Research proposal evaluation',
      'Combination of the above'
    ]
  }],
  profileAdmissionPreference: {
    type: String,
    enum: ['Yes', 'Depends on program', 'No']
  },
  preferredScholarTypes: [{
    type: String,
    enum: [
      'Academicians',
      'Working professionals',
      'Industry experts',
      'International scholars',
      'Research-oriented candidates only'
    ]
  }],

  // Section 6: Association with ShodhSutra
  interests: [{
    type: String,
    enum: [
      'Better-qualified PhD applicants',
      'Structured scholar profiling',
      'Higher completion probability',
      'Ethical admission support',
      'Research ecosystem collaboration'
    ]
  }],
  supportPreferences: [{
    type: String,
    enum: [
      'Scholar profiling & readiness assessment',
      'Pre-admission clarity & counselling',
      'Research guidance support',
      'Scholar retention & completion support',
      'Academic collaboration'
    ]
  }],
  institutionPhilosophy: {
    type: String,
    enum: [
      'Quality of scholars matters more than quantity',
      'Completion rate reflects academic credibility',
      'Structured guidance improves outcomes',
      'Ethical admissions protect long-term reputation'
    ]
  },

  // Section 7: Point of Contact
  contactPerson: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    designation: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: true,
      trim: true
    }
  },

  // Declaration
  declarationConfirmed: {
    type: Boolean,
    required: true,
    default: false
  },

  // Metadata
  submissionDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Submitted', 'Under Review', 'Approved', 'Rejected', 'Contacted'],
    default: 'Submitted'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for better query performance
universitySchema.index({ 'contactPerson.email': 1 });
universitySchema.index({ status: 1 });
universitySchema.index({ submissionDate: -1 });

export default mongoose.model('University', universitySchema);