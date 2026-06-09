require('dotenv').config();
const { Pool } = require('pg');

// .env から設定を読み込む
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function connectDB() {
  try {
    // データベースに接続
    const client = await pool.connect();
    console.log('DBに接続しました');

    // 接続を終了して片付ける
    client.release();
    console.log('接続を終了しました');
  } catch (err) {
    console.error('接続エラー:', err.stack);
  } finally {
    // pool全体を閉じる
    await pool.end();
  }
}

connectDB();