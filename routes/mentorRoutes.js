import express from "express";

import { upload } from "../middleware/upload.js";

import {
  submitMentor,
  getAllMentors,
  getMentorById,
  deleteMentor
} from "../controllers/mentorController.js";


const router = express.Router();


/* ================= SUBMIT ================= */
router.post(
  "/submit",

  upload.fields([
    { name: "researchFiles", maxCount: 10 },
    { name: "signatureFile", maxCount: 1 }
  ]),

  submitMentor
);


/* ================= GET ALL ================= */
router.get("/", getAllMentors);


/* ================= GET SINGLE ================= */
router.get("/:id", getMentorById);


/* ================= DELETE ================= */
router.delete("/:id", deleteMentor);


export default router;
