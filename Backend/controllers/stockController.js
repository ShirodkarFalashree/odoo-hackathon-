import pool from "../config/db.js";

export const getStock = async (req, res) => {
  const [rows] = await pool.query(
    `SELECT p.id AS product_id, p.name, p.unit_cost,
            s.qty_on_hand, s.qty_free
     FROM products p
     JOIN stock_levels s ON p.id = s.product_id`
  );
  res.json(rows);
};

export const updateStock = async (req, res) => {
  const { qty_on_hand, qty_free } = req.body;
  const productId = req.params.id;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    await conn.query(
      `UPDATE stock_levels SET qty_on_hand=?, qty_free=? WHERE product_id=?`,
      [qty_on_hand, qty_free, productId]
    );

    await conn.query(
      `INSERT INTO stock_moves 
       (product_id, reference_type, reference_code, move_date, qty_change, status)
       VALUES (?, 'adjustment', 'MANUAL', CURDATE(), ?, 'done')`,
      [productId, qty_on_hand, qty_on_hand]
    );

    await conn.commit();
    res.json({ success: true });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false });
  } finally {
    conn.release();
  }
};
