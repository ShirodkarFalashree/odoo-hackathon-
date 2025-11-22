import pool from "../config/db.js";

export const signup = async (req, res) => {
  const { login_id, email, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (login_id, email, password) VALUES (?, ?, ?)",
      [login_id, email, password]
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

  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid Login ID" });
  }

  if (password !== user.password) {
    return res.status(401).json({ success: false, message: "Invalid Password" });
  }

  res.json({
    success: true,
    user: { id: user.id, login_id: user.login_id }
  });
};
