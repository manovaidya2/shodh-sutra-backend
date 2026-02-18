// import express from "express";
// import { submitProfile, getProfiles, getProfileById, getAllProfiles } from "../controllers/shodhSutraController.js";

// const router = express.Router();

// router.post("/submit", submitProfile);
// router.get("/profiles", getProfiles);
// router.get("/all-profiles", getAllProfiles);
// router.get("/profiles/:id", getProfileById);

// export default router;


import express from 'express';
import { submitProfile, getProfiles, getProfileById } from '../controllers/shodhSutraController.js';

const router = express.Router();

router.post('/submit', submitProfile);
router.get('/profiles', getProfiles);
router.get('/profiles/:id', getProfileById);

export default router;