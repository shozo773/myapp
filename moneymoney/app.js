const express = require('express');
// 💡 先ほど直した1つ上の階層の db_connect.js を読み込む
const pool = require('../db_connect'); 

const app = express();
app.use(express.json());
app.use(express.static('public'));

// 🚀 テーブルがなければ自動作成
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS money (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        amount INTEGER NOT NULL,
        type VARCHAR(50) NOT NULL DEFAULT 'expense',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ 成功！moneyテーブルの準備が完了しました！");
  } catch (err) {
    console.error("❌ DB接続エラー:", err.message);
  }
}

// 1. データ一覧取得 (GET)
app.get('/api/money', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM money ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('データ取得エラー:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// 2. データ新規作成 (POST)
app.post('/api/money', async (req, res) => {
  try {
    const { title, amount, type } = req.body;
    const result = await pool.query(
      'INSERT INTO money (title, amount, type) VALUES ($1, $2, $3) RETURNING *',
      [title, amount, type || 'expense']
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('データ追加エラー:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DBの準備が終わったらサーバー起動
initDB().then(() => {
  app.listen(3000, () => {
    console.log('サーバーが起動しました: http://localhost:3000');
  });
});