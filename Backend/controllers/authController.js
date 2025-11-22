import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const { login_id, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (login_id, email, password_hash) VALUES (?, ?, ?)",
      [login_id, email, hash]
    );

    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ success: false, message: "User exists or DB error" });
  }
};

export const login = async (req, res) => {
  const { login_id, password } = req.body;
  const [[user]] = await pool.query(
    "SELECT * FROM users WHERE login_id = ?",
    [login_id]
  );

  if (!user) return res.status(401).json({ success: false });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) return res.status(401).json({ success: false });

  res.json({
    success: true,
    user: { id: user.id, login_id: user.login_id }
  });
};
