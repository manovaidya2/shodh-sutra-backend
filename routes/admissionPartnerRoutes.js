import express from "express";
import { 
  submitApplication, 
  getAllApplications, 
  getApplicationById, 
  updateApplicationStatus, 
  downloadDocument,
  deleteApplication 
} from "../controllers/admissionPartnerController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// PUBLIC ROUTES
router.post(
  "/submit",
  upload.array("documents", 10),
  submitApplication
);

router.get("/applications", getAllApplications);
router.get("/applications/:id", getApplicationById);
router.put("/applications/:id/status", updateApplicationStatus);
router.get("/applications/:id/documents/:docId", downloadDocument);
router.delete("/applications/:id", deleteApplication);

export default router;
