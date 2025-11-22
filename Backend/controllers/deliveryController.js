import pool from "../config/db.js";

async function generateReference(conn) {
  const [[wh]] = await conn.query("SELECT short_code FROM warehouses LIMIT 1");
  const prefix = `${wh.short_code}/OUT/`;

  const [[last]] = await conn.query(
    `SELECT reference_code FROM delivery_orders 
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

export const createDelivery = async (req, res) => {
  const {
    from_location_id, to_name, contact_name,
    schedule_date, operation_type, responsible_user_id
  } = req.body;

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const reference_code = await generateReference(conn);

    const [result] = await conn.query(
      `INSERT INTO delivery_orders 
       (reference_code, from_location_id, to_name, contact_name,
        schedule_date, operation_type, responsible_user_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [reference_code, from_location_id, to_name, contact_name,
       schedule_date, operation_type, responsible_user_id]
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
    "INSERT INTO delivery_lines (delivery_id, product_id, qty) VALUES (?, ?, ?)",
    [req.params.id, req.body.product_id, req.body.qty]
  );
  res.json({ success: true });
};

export const updateStatus = async (req, res) => {
  await pool.query(
    "UPDATE delivery_orders SET status=? WHERE id=?",
    [req.body.status, req.params.id]
  );
  res.json({ success: true });
};

export const validateDelivery = async (req, res) => {
  const id = req.params.id;
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [[delivery]] = await conn.query(
      `SELECT * FROM delivery_orders WHERE id=?`, [id]
    );
    if (!delivery) throw new Error("not found");

    const [lines] = await conn.query(
      `SELECT dl.*, p.name 
       FROM delivery_lines dl JOIN products p ON dl.product_id=p.id
       WHERE delivery_id=?`,
      [id]
    );

    for (const line of lines) {
      const [[stock]] = await conn.query(
        "SELECT qty_free FROM stock_levels WHERE product_id=?",
        [line.product_id]
      );
      if (!stock || stock.qty_free < line.qty)
        throw new Error(`Insufficient stock for ${line.name}`);
    }

    for (const line of lines) {
      await conn.query(
        `UPDATE stock_levels SET 
         qty_on_hand = qty_on_hand - ?, qty_free = qty_free - ?
         WHERE product_id=?`,
        [line.qty, line.qty, line.product_id]
      );

      await conn.query(
        `INSERT INTO stock_moves 
         (product_id, reference_type, reference_id, reference_code, move_date,
          qty_change, from_name, to_name, status)
         VALUES (?, 'delivery', ?, ?, CURDATE(), ?, ?, ?, 'done')`,
        [line.product_id, id, delivery.reference_code, -line.qty,
         delivery.from_location_id, delivery.to_name]
      );
    }

    await conn.query(
      "UPDATE delivery_orders SET status='done', validated_at=NOW() WHERE id=?",
      [id]
    );

    await conn.commit();
    res.json({ success: true });

  } catch (err) {
    await conn.rollback();
    res.status(400).json({ success: false, message: err.message });
  } finally {
    conn.release();
  }
};
