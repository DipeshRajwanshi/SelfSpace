import express from "express";
import Book from "../models/book.js";
import multer from "multer";

const router = express.Router();

// Multer storage (for file upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Create a new book
router.post("/", upload.fields([{ name: "cover" }, { name: "file" }]), async (req, res) => {
  try {
    const { title, semester, description, price } = req.body;

    const newBook = new Book({
      title,
      semester,
      description,
      price,
      coverUrl: req.files["cover"] ? `/uploads/${req.files["cover"][0].filename}` : null,
      fileUrl: req.files["file"] ? `/uploads/${req.files["file"][0].filename}` : null,
      owner: req.userId // (from auth middleware)
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find().populate("owner", "username email");
  res.json(books);
});

export default router;
