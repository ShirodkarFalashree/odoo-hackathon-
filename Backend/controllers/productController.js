import pool from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ success: false });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, sku, uom, unit_cost, reorder_level } = req.body;

    await pool.query(
      "INSERT INTO products (name, sku, uom, unit_cost, reorder_level) VALUES (?, ?, ?, ?, ?)",
      [name, sku, uom, unit_cost, reorder_level]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

