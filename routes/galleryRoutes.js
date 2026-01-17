import express from "express";
import multer from "multer";
import {
  uploadImage,
  getImages,
  deleteImage,
  updateImage,
} from "../controllers/galleryController.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.post("/upload", upload.single("image"), uploadImage);
router.get("/", getImages);
router.delete("/:id", deleteImage);
router.put("/:id", upload.single("image"), updateImage); // replace image

export default router;
