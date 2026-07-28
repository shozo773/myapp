require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'postgres',   // 💡 原因はココ！ 'chatdb' から 'postgres' に修正
  user: 'postgres',
  password: 'Yamiyami773' // 💡 パスワードも確実に通るように設定
});

// 💡 app.js で pool.query が使えるように pool そのものをエクスポート
module.exports = pool;