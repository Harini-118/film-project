// server/src/routes/public.js
import express from "express";
import Member from "../models/Member.js";

const router = express.Router();

// Get all members for public display
router.get("/members", async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;