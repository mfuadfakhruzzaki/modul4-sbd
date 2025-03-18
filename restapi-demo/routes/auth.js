import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db";
const router = express.Router();

// Register
router.post("/register", (req, res) => {
  const { nama, email, password } = req.body;

  bcrypt.hash(String(password), 10, (err, hash) => {
    if (err) return res.status(500).json({ message: "Error hashing password" });

    const sql = "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)";
    db.query(sql, [nama, email, hash], (err) => {
      if (err) return res.status(500).json({ message: "Registration failed" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Login failed" });
    if (results.length === 0)
      return res.status(401).json({ message: "User not found" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch)
        return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ message: "Login successful", token });
    });
  });
});

// Get All Users (butuh autentikasi)
import authenticateToken from "../middleware/authMiddleware";
router.get("/users", authenticateToken, (_, res) => {
  db.query("SELECT id, nama, email, created_at FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: "Error retrieving users" });
    res.json(results);
  });
});

export default router;
