import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Consultation", consultationSchema);
