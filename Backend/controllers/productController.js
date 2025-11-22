import pool from "../config/db.js";

export const getProducts = async (req, res) => {
  const search = `%${req.query.search || ""}%`;

  const [rows] = await pool.query(
    `SELECT p.*, s.qty_on_hand, s.qty_free
     FROM products p
     LEFT JOIN stock_levels s ON p.id=s.product_id
     WHERE p.name LIKE ? OR p.sku LIKE ?
     ORDER BY p.name ASC`,
    [search, search]
  );

  res.json(rows);
};

export const createProduct = async (req, res) => {
  const {
    name, sku, category, unit_of_measure,
    unit_cost, reorder_level, initial_stock
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO products (name, sku, category, unit_of_measure, unit_cost, reorder_level)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, sku, category, unit_of_measure, unit_cost, reorder_level]
    );

    const productId = result.insertId;
    const qty = initial_stock || 0;

    await conn.query(
      `INSERT INTO stock_levels (product_id, qty_on_hand, qty_free)
       VALUES (?, ?, ?)`,
      [productId, qty, qty]
    );

    if (qty > 0) {
      await conn.query(
        `INSERT INTO stock_moves 
         (product_id, reference_type, reference_code, move_date, qty_change, status)
         VALUES (?, 'adjustment', 'INIT', CURDATE(), ?, 'done')`,
        [productId, qty]
      );
    }

    await conn.commit();
    res.json({ success: true });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false });
  } finally {
    conn.release();
  }
};
