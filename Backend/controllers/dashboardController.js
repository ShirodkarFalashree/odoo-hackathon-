import pool from "../config/db.js";

export const getOverview = async (req, res) => {
  const [[receiptPending]] = await pool.query(
    `SELECT COUNT(*) AS count
     FROM receipts WHERE status!='done'`
  );

  const [[deliveryPending]] = await pool.query(
    `SELECT COUNT(*) AS count
     FROM delivery_orders WHERE status!='done'`
  );

  res.json({
    receipts: {
      to_receive: receiptPending.count,
      operations: receiptPending.count
    },
    deliveries: {
      to_deliver: deliveryPending.count,
      operations: deliveryPending.count
    }
  });
};
