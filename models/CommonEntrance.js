import mongoose from "mongoose";

const entranceExamSchema = new mongoose.Schema({

  applicationData: {
    type: Object,
    required: true
  },

  documents: {

    idProofDocument: String,

    tenthMarksheet: String,
    twelfthMarksheet: String,
    graduationDegree: String,
    pgDegree: String,
    cvResume: String,
    passportPhoto: String

  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model(
  "EntranceExam",
  entranceExamSchema
);
