// server/src/routes/admin.js
import express from "express";
import Member from "../models/Member.js";
import { authMiddleware } from "../middleware/auth.js";
import multer from 'multer';
import path from 'path'; // <-- 1. IMPORT PATH MODULE
import { fileURLToPath } from 'url'; // <-- 2. IMPORT HELPER

// --- 3. BOILERPLATE TO GET THE CURRENT DIRECTORY PATH ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ---------------------------------------------------------

const router = express.Router();

// Setup multer for image uploads
const storage = multer.diskStorage({
  // --- 4. THIS IS THE CRUCIAL FIX ---
  destination: function (req, file, cb) {
    // We construct an absolute path to the uploads directory
    // __dirname is '.../server/src', so we go up one level ('..') and then into 'uploads'
    const uploadPath = path.join(__dirname, '..', 'uploads');
    cb(null, uploadPath);
  },
  // ------------------------------------
  filename: function (req, file, cb) {
    // Create a unique filename to prevent overwriting
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Add a new member
// Notice we use upload.single('image') as middleware here
router.post("/members", authMiddleware, upload.single('image'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const { name, position, description } = req.body;
    // Get the relative path to store in the database
    const imageUrl = `uploads/${req.file.filename}`;

    const newMember = new Member({
      name,
      position,
      description,
      imageUrl, // Store the relative path
      createdBy: req.user.userId,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error("Error in POST /members:", error); // Log the full error on the server
    res.status(500).json({ message: "Error adding member", error: error.message });
  }
});

// Get all members
router.get("/members", authMiddleware, async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;