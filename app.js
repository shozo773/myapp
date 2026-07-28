require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// PostgreSQL接続設定（.envから読み込み）
const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// メッセージ一覧の取得 API
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM messages ORDER BY created_at ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('メッセージ取得エラー:', err);
    res.status(500).json({ error: 'DBからの取得に失敗しました' });
  }
});

// メッセージ新規作成 API
app.post('/api/messages', async (req, res) => {
  try {
    const { username, text } = req.body;
    const result = await pool.query(
      'INSERT INTO messages (username, text) VALUES ($1, $2) RETURNING *',
      [username, text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('メッセージ追加エラー:', err);
    res.status(500).json({ error: 'DBへの保存に失敗しました' });
  }
});

// サーバー起動（環境変数 PORT を優先使用、無ければ 3000）
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`サーバが起動しました： http://localhost:${PORT}`);
});