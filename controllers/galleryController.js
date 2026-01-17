import GalleryImage from "../models/GalleryImage.js";
import fs from "fs";
import path from "path";

// Upload Image (Admin)
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = new GalleryImage({
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await image.save();

    res.status(201).json({
      message: "Image uploaded successfully",
      image,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Images (Frontend)
export const getImages = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Image
export const deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Delete file from uploads folder
    const filePath = path.join("uploads", path.basename(image.imageUrl));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await image.deleteOne();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Image
export const updateImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    if (!req.file) return res.status(400).json({ message: "No new file uploaded" });

    // Delete old file
    const oldPath = path.join("uploads", path.basename(image.imageUrl));
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

    // Save new file
    image.imageUrl = `/uploads/${req.file.filename}`;
    await image.save();

    res.status(200).json({ message: "Image updated successfully", image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
