import pool from "../config/db.js";

export const getLocations = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM locations");
  res.json(rows);
};

export const createLocation = async (req, res) => {
  const { name, short_code } = req.body;
  const [[wh]] = await pool.query("SELECT id FROM warehouses LIMIT 1");

  await pool.query(
    `INSERT INTO locations (name, short_code, warehouse_id) VALUES (?, ?, ?)`,
    [name, short_code, wh.id]
  );

  res.json({ success: true });
};
