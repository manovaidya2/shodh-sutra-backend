import express from "express";
import {
  applyScholarship,
  getAllApplications,
  getSingleApplication
} from "../controllers/scholarshipController.js";

const router = express.Router();

// ================= ROUTES =================

// Apply
router.post("/apply", applyScholarship);

// Admin - Get All
router.get("/all", getAllApplications);

// Get Single
router.get("/:id", getSingleApplication);

export default router;