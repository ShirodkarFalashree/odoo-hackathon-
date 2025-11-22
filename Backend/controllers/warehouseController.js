import pool from "../config/db.js";

// Create Warehouse
export const createWarehouse = async (req, res) => {
  const { name, short_code, address } = req.body;
  try {
    await pool.query(
      `INSERT INTO warehouses (name, short_code, address) VALUES (?, ?, ?)`,
      [name, short_code, address]
    );
    res.json({ success: true, message: "Warehouse created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Error creating warehouse" });
  }
};

// Get first warehouse
export const getWarehouse = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM warehouses LIMIT 1`);
    res.json(rows[0] || null);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};

// Update warehouse
export const updateWarehouse = async (req, res) => {
  const { id, name, short_code, address } = req.body;
  try {
    await pool.query(
      `UPDATE warehouses SET name=?, short_code=?, address=? WHERE id=?`,
      [name, short_code, address, id]
    );
    res.json({ success: true, message: "Warehouse updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
};
