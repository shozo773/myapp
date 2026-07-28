import { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]); // 💡 初期値は空配列 []
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  // 1. 初回レンダリング時に DB からメッセージを取得 (GET)
  useEffect(() => {
    fetch("api/messages") // 💡 先頭に / を付けない
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("データ取得エラー:", err));
  }, []); // 💡 依存配列 [] で初回1回だけ実行

  // 2. メッセージ送信処理 (POST)
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("api/messages", { // 💡 先頭に / を付けない
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, text }),
    })
      .then((res) => res.json())
      .then((newMessage) => {
        // DBで追加された新しいオブジェクトを配列に追加
        setMessages((prev) => [...prev, newMessage]);
        setText(""); // 入力欄のリセット（名前は残す）
      })
      .catch((err) => console.error("送信エラー:", err));
  };

  return (
    <>
      <h1>チャット</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="名前"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="メッセージ"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">送信</button>
      </form>

      <ul className="messages">
        {messages.map((m) => (
          <li key={m.id}>
            {m.username}: {m.text}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;