require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(express.static('frontend/dist'));

const pool = new Pool({
  host:     process.env.DB_HOST || 'localhost',
  port:     process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'myapp',
  user:     process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

// 起動時にメッセージ用テーブルを自動作成する処理
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ データベース(messagesテーブル)の準備が完了しました");
  } catch (err) {
    console.error("❌ DB接続/テーブル作成エラー:", err.message);
  }
}
initDB();

// 1. チャットメッセージ一覧の取得 (GET)
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('データ取得エラー:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 2. チャットメッセージの追加 (POST)
app.post('/api/messages', async (req, res) => {
  try {
    const { username, text } = req.body;
    const result = await pool.query(
      'INSERT INTO messages (username, text) VALUES ($1, $2) RETURNING *',
      [username, text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('データ追加エラー:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})