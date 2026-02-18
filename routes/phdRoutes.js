import express from "express";
import {
  applyPhdAdmission,
  getAllPhdAdmissions,
  getPhdAdmissionById,
  deletePhdAdmission
} from "../controllers/phdController.js";

import { upload } from "../middleware/upload.js";

const router = express.Router();


router.post(
  "/apply",
  
  upload.fields([
    { name: "tenthMarksheet" },
    { name: "twelfthMarksheet" },
    { name: "graduationDegree" },
    { name: "pgDegree" },
    { name: "idProof" },
    { name: "passportPhoto" },
    { name: "cvResume" },
    { name: "researchProposal" }
  ]),
  applyPhdAdmission
);


router.get("/all", getAllPhdAdmissions);

router.get("/:id", getPhdAdmissionById);

router.delete("/:id", deletePhdAdmission);

export default router;
