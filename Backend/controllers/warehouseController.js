import pool from "../config/db.js";

export const getWarehouse = async (req, res) => {
  const [rows] = await pool.query(`SELECT * FROM warehouses LIMIT 1`);
  res.json(rows[0] || null);
};

export const updateWarehouse = async (req, res) => {
  const { id, name, short_code, address } = req.body;
  await pool.query(
    `UPDATE warehouses SET name=?, short_code=?, address=? WHERE id=?`,
    [name, short_code, address, id]
  );
  res.json({ success: true });
};
