const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const PORT = 3000;

// JSONデータを受け取るためのミドルウェア設定
app.use(express.json());

// 静的ファイル（Reactのビルド物など）の提供設定
app.use(express.static(path.join(__dirname, "public")));

// PostgreSQL への接続設定（環境に合わせて設定してください）
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres", // お使いのDB名（chat等）に変更してください
  password: "password", // お使いのパスワードに変更してください
  port: 5432,
});

// 1. メッセージ一覧取得 API (GET)
// ★ URLが '/api/messages' になっていることが重要です
app.get("/api/messages", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GETエラー:", err.message);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

// 2. メッセージ追加 API (POST)
// ★ URLが '/api/messages' になっていることが重要です
app.post("/api/messages", async (req, res) => {
  const { username, text } = req.body;

  if (!username || !text) {
    return res.status(400).json({ error: "名前とメッセージは必須です" });
  }

  try {
    const queryText =
      "INSERT INTO messages (username, text) VALUES ($1, $2) RETURNING *";
    const result = await pool.query(queryText, [username, text]);

    // 作成されたメッセージ（id, username, text 等が入ったオブジェクト）を返す
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("POSTエラー:", err.message);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});