const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());

// PostgreSQLの接続設定（自分の環境に合わせて書き換えてください）
const pool = new Pool({
  connectionString: 'postgres://ユーザー名:パスワード@localhost:5432/データベース名'
});

// テスト用フロントエンド（HTML）を表示する設定
app.use(express.static(path.join(__dirname, 'public')));

// 1. タスク一覧取得 (GET)
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

// 2. タスク追加 (POST)
app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'タイトルは必須です' });
  }
  try {
    await pool.query('INSERT INTO tasks (title) VALUES ($1)', [title]);
    res.json({ success: true, message: 'タスクを追加しました' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});