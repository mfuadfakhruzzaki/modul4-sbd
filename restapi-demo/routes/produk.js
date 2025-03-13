const express = require("express");
const db = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get All Produk
router.get("/", authenticateToken, (req, res) => {
  db.query("SELECT * FROM produk", (err, results) => {
    if (err) {
      console.error("Database error on GET /produk:", err);
      return res.status(500).json({ message: "Error retrieving products" });
    }
    res.json(results);
  });
});

// Add Produk
router.post("/", authenticateToken, (req, res) => {
  try {
    const { nama, stok, link_gambar } = req.body;

    // Validate required fields
    if (!nama || stok === undefined) {
      return res.status(400).json({ message: "Name and stock are required" });
    }

    // Convert stok to number if it's a string
    const stockNum = typeof stok === "string" ? parseInt(stok, 10) : stok;

    // Validate stock is a number
    if (isNaN(stockNum)) {
      return res.status(400).json({ message: "Stock must be a valid number" });
    }

    console.log("Adding product:", { nama, stok: stockNum, link_gambar });

    const sql = "INSERT INTO produk (nama, stok, link_gambar) VALUES (?, ?, ?)";

    db.query(sql, [nama, stockNum, link_gambar], (err, result) => {
      if (err) {
        console.error("Database error on POST /produk:", err);
        return res.status(500).json({ message: "Error adding product" });
      }

      res.status(201).json({
        message: "Product added successfully",
        productId: result.insertId,
      });
    });
  } catch (error) {
    console.error("Server error on POST /produk:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get Product by ID
router.get("/:id", authenticateToken, (req, res) => {
  const productId = req.params.id;
  db.query(
    "SELECT * FROM produk WHERE id_barang = ?",
    [productId],
    (err, results) => {
      if (err) {
        console.error("Database error on GET /produk/:id:", err);
        return res.status(500).json({ message: "Error retrieving product" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(results[0]);
    }
  );
});

// Update Product
router.put("/:id", authenticateToken, (req, res) => {
  try {
    const productId = req.params.id;
    const { nama, stok, link_gambar } = req.body;

    // Validate required fields
    if (!nama || stok === undefined) {
      return res.status(400).json({ message: "Name and stock are required" });
    }

    // Convert stok to number if it's a string
    const stockNum = typeof stok === "string" ? parseInt(stok, 10) : stok;

    // Validate stock is a number
    if (isNaN(stockNum)) {
      return res.status(400).json({ message: "Stock must be a valid number" });
    }

    const sql =
      "UPDATE produk SET nama = ?, stok = ?, link_gambar = ? WHERE id_barang = ?";

    db.query(sql, [nama, stockNum, link_gambar, productId], (err, result) => {
      if (err) {
        console.error("Database error on PUT /produk/:id:", err);
        return res.status(500).json({ message: "Error updating product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product updated successfully" });
    });
  } catch (error) {
    console.error("Server error on PUT /produk/:id:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Product
router.delete("/:id", authenticateToken, (req, res) => {
  const productId = req.params.id;

  db.query(
    "DELETE FROM produk WHERE id_barang = ?",
    [productId],
    (err, result) => {
      if (err) {
        console.error("Database error on DELETE /produk/:id:", err);
        return res.status(500).json({ message: "Error deleting product" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    }
  );
});

module.exports = router;
