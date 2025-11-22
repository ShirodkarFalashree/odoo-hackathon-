import pool from "../config/db.js";

async function generateReference(conn) {
  const [[wh]] = await conn.query("SELECT short_code FROM warehouses LIMIT 1");
  const prefix = `${wh.short_code}/IN/`;

  const [[last]] = await conn.query(
    `SELECT reference_code FROM receipts 
     WHERE reference_code LIKE ? 
     ORDER BY id DESC LIMIT 1`,
    [`${prefix}%`]
  );

  let next = 1;
  if (last && last.reference_code) {
    next = parseInt(last.reference_code.split("/")[2]) + 1;
  }
  return prefix + String(next).padStart(4, "0");
}

export const createReceipt = async (req, res) => {
  const {
    from_name, to_location_id, contact_name,
    schedule_date, responsible_user_id
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const reference_code = await generateReference(conn);

    const [result] = await conn.query(
      `INSERT INTO receipts (reference_code, from_name, to_location_id, contact_name, schedule_date, responsible_user_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [reference_code, from_name, to_location_id, contact_name, schedule_date, responsible_user_id]
    );

    await conn.commit();
    res.json({ success: true, id: result.insertId });

  } catch (err) {
    await conn.rollback();
    res.status(500).json({ success: false });
  } finally {
    conn.release();
  }
};

export const addLine = async (req, res) => {
  await pool.query(
    "INSERT INTO receipt_lines (receipt_id, product_id, qty) VALUES (?, ?, ?)",
    [req.params.id, req.body.product_id, req.body.qty]
  );
  res.json({ success: true });
};

export const updateStatus = async (req, res) => {
  await pool.query(
    "UPDATE receipts SET status=? WHERE id=?",
    [req.body.status, req.params.id]
  );
  res.json({ success: true });
};

export const validateReceipt = async (req, res) => {
  const id = req.params.id;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [[receipt]] = await conn.query(
      `SELECT * FROM receipts WHERE id=?`, [id]
    );
    if (!receipt) throw new Error("not found");

    const [lines] = await conn.query(
      `SELECT rl.*, p.name 
       FROM receipt_lines rl JOIN products p ON rl.product_id = p.id
       WHERE receipt_id=?`,
      [id]
    );

    for (const line of lines) {
      await conn.query(
        `UPDATE stock_levels SET 
         qty_on_hand = qty_on_hand + ?, qty_free = qty_free + ? 
         WHERE product_id=?`,
        [line.qty, line.qty, line.product_id]
      );

      await conn.query(
        `INSERT INTO stock_moves 
         (product_id, reference_type, reference_id, reference_code, move_date,
          qty_change, from_name, to_name, status)
         VALUES (?, 'receipt', ?, ?, CURDATE(), ?, ?, ?, 'done')`,
        [line.product_id, id, receipt.reference_code, line.qty, receipt.from_name, receipt.to_location_id]
      );
    }

    await conn.query(
      "UPDATE receipts SET status='done', validated_at=NOW() WHERE id=?",
      [id]
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
