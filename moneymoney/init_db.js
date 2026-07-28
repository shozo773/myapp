require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host:     process.env.DB_HOST || 'localhost',
  port:     process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres', // 💡 postgres に指定
  user:     process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres', // 💡 パスワード
});

async function init() {
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
    console.log("✅ money テーブルの作成に成功しました！");
  } catch (err) {
    console.error("❌ テーブル作成エラー:", err);
  } finally {
    await pool.end();
  }
}

init();