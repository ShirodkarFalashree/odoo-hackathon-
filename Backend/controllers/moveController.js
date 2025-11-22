import pool from "../config/db.js";

export const getMoves = async (req, res) => {
  const search = `%${req.query.search || ""}%`;

  const [rows] = await pool.query(
    `SELECT sm.*, p.name AS product_name
     FROM stock_moves sm
     JOIN products p ON sm.product_id=p.id
     WHERE sm.reference_code LIKE ? 
        OR sm.contact_name LIKE ?
     ORDER BY sm.id DESC`,
    [search, search]
  );

  res.json(rows);
};
