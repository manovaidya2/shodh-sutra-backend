// import mongoose from "mongoose";

// const ShodhSutraSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     mobile: { type: String, required: true },
//     cityCountry: String,
//     age: String,

//     class10: {
//       board: String,
//       year: String,
//       percentage: String,
//     },

//     class12: {
//       stream: String,
//       board: String,
//       year: String,
//       percentage: String,
//     },

//     graduation: {
//       degree: String,
//       specialisation: String,
//       university: String,
//       mode: String,
//       admissionYear: String,
//       passingYear: String,
//       percentage: String,
//     },

//     postGraduation: {
//       status: String,
//       degree: String,
//       specialisation: String,
//       university: String,
//       admissionYear: String,
//       passingYear: String,
//       mode: String,
//       percentage: String,
//     },

//     // Uploaded files
//     uploadedFiles: [
//       {
//         filename: { type: String, required: true },
//         originalName: { type: String, required: true },
//         mimeType: { type: String, required: true },
//         size: { type: Number, required: true },
//         path: { type: String, required: true },
//         url: { type: String, required: true },
//         uploadedAt: { type: Date, default: Date.now }
//       }
//     ],

//     // Form submission metadata
//     formStatus: { 
//       type: String, 
//       enum: ['draft', 'submitted'], 
//       default: 'submitted' 
//     },
//     submissionIp: String,
//     userAgent: String,
//   },
//   { 
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Index for faster queries
// ShodhSutraSchema.index({ email: 1 });
// ShodhSutraSchema.index({ mobile: 1 });
// ShodhSutraSchema.index({ createdAt: -1 });

// // Virtual for formatted date
// ShodhSutraSchema.virtual('submissionDate').get(function() {
//   return this.createdAt.toLocaleDateString('en-IN', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric'
//   });
// });

// export default mongoose.model("ShodhSutraProfile", ShodhSutraSchema);



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