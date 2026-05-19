const express = require('express');
const app = express();

// 💡重要：これがないとブラウザから送られてきたJSONデータを読み込めません
app.use(express.json()); 
app.use(express.static('public')); 

// 🚀ここを追加します（URLは自分のアプリに合わせて変更してください）
app.post('/api/items', (req, res) => {
  // 1. 分割代入でデータを取り出す（例：商品名と個数）
  const { name, quantity } = req.body; 

  // 2. 省略記法でオブジェクトにまとめる
  const newItem = { name, quantity }; 

  // 3. サーバーのターミナルに表示する
  console.log('受け取ったデータ:', newItem);

  // 4. フロントにお返事のJSONを返す
  res.json(newItem);
});

app.listen(3000, () => {
  console.log('サーバー起動: http://localhost:3000');
});