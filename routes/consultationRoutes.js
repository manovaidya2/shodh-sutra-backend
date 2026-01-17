import express from "express";
import {
  createConsultation,
  getAllConsultations,
} from "../controllers/consultationController.js";

const router = express.Router();

router.post("/consultation", createConsultation);
router.get("/consultation", getAllConsultations);

export default router;
