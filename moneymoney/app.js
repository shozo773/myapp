const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const PORT = 3000;

// 画面から送られてくるJSONデータを受け取るための設定
app.use(express.json());

// このあと作る画面（HTML）を、サーバーから表示できるようにする設定
app.use(express.static(path.join(__dirname, 'public')));

// ★PostgreSQLへの接続設定
// お使いの環境（ユーザー名やパスワード）に合わせて書き換えてください
const pool = new Pool({
  user: 'postgres',          // PostgreSQLのユーザー名
  host: 'localhost',         // パソコン自身を表すホスト名
  database: 'money_tracker', // ステップ2で作ったデータベース名
  password: 'password',      // ご自身のPostgreSQLのパスワード
  port: 5432,                // PostgreSQLの標準ポート番号
});

// 【エンドポイント1】データ全件取得 (GET)
app.get('/api/expenses', async (req, res) => {
  try {
    // 日付が新しい順（DESC）でデータを取得
    const result = await pool.query('SELECT * FROM expenses ORDER BY created_at DESC');
    res.json(result.rows); // クライアント（画面）にJSONで返す
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

// 【エンドポイント2】データ1件追加 (POST)
app.post('/api/expenses', async (req, res) => {
  const { title, amount } = req.body; // 画面から送られてきたデータ

  // 入力チェック
  if (!title || amount === undefined) {
    return res.status(400).json({ error: 'タイトルと金額を入力してください' });
  }

  try {
    // データベースに安全にデータを挿入（安全のため $1, $2 を使用）
    const queryText = 'INSERT INTO expenses (title, amount) VALUES ($1, $2) RETURNING *';
    const result = await pool.query(queryText, [title, amount]);
    
    res.status(201).json(result.rows[0]); // 追加されたデータを返す
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'サーバーエラーが発生しました' });
  }
});

// サーバーを起動する
app.listen(PORT, () => {
  console.log(`サーバーが起動しました！ http://localhost:${PORT}`);
});