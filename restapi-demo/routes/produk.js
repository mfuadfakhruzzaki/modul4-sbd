const express = require("express");
const db = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get All Produk
router.get("/", authenticateToken, (req, res) => {
  db.query("SELECT * FROM produk", (err, results) => {
    if (err)
      return res.status(500).json({ message: "Error retrieving products" });
    res.json(results);
  });
});

// Add Produk
router.post("/", authenticateToken, (req, res) => {
  const { nama, stok, link_gambar } = req.body;
  const sql = "INSERT INTO produk (nama, stok, link_gambar) VALUES (?, ?, ?)";

  db.query(sql, [nama, stok, link_gambar], (err) => {
    if (err) return res.status(500).json({ message: "Error adding product" });
    res.status(201).json({ message: "Product added successfully" });
  });
});

module.exports = router;
