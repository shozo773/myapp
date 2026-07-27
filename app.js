const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const PORT = 3000;

// JSONデータを受け取るための設定
app.use(express.json());

// ★15-2の課題設定：ビルドされたReact（frontend/dist）をExpressから配信
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// PostgreSQLへの接続設定（ご自身の環境に合わせて変更してください）
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Yamiyami773", // パスワードを設定している場合は変更
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