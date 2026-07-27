const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// PostgreSQLの接続設定（自分の環境に合わせて設定してください）
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres", 
  password: "password", 
  port: 5432,
});

// チャットアプリ用の API エンドポイント
app.get("/api/messages", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM messages ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("GETエラー:", err.message);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

app.post("/api/messages", async (req, res) => {
  const { username, text } = req.body;
  if (!username || !text) {
    return res.status(400).json({ error: "名前とメッセージは必須です" });
  }
  try {
    const queryText = "INSERT INTO messages (username, text) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(queryText, [username, text]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POSTエラー:", err.message);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});