// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Test route for debugging
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes working!" });
});

// Login route
router.post("/login", async (req, res) => {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body; // Changed from emailOrUsername

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({
      email: email.toLowerCase(), // Ensure lowercase matching
      isActive: true,
    }).populate("tenantId");

    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log('Comparing passwords...');
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        tenantId: user.tenantId?._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log('Login successful for user:', user.email);
    
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        tenant: user.tenantId,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password")
      .populate("tenantId");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;