import express from "express";

import {
  applyEntranceExam,
  getAllEntranceExams,
  getEntranceExamById,
  deleteEntranceExam
}
from "../controllers/commonEntranceExamController.js";

import { upload }
from "../middleware/upload.js";

const router = express.Router();


// multer fields

const uploadFields =
  upload.fields([

    { name: "idProofDocument", maxCount: 1 },

    { name: "tenthMarksheet", maxCount: 1 },

    { name: "twelfthMarksheet", maxCount: 1 },

    { name: "graduationDegree", maxCount: 1 },

    { name: "pgDegree", maxCount: 1 },

    { name: "cvResume", maxCount: 1 },

    { name: "passportPhoto", maxCount: 1 }

  ]);



// APPLY

router.post(
  "/apply",
  uploadFields,
  applyEntranceExam
);


// GET ALL

router.get(
  "/all",
  getAllEntranceExams
);


// GET SINGLE

router.get(
  "/:id",
  getEntranceExamById
);


// DELETE

router.delete(
  "/:id",
  deleteEntranceExam
);


export default router;
