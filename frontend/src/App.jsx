import { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  // 1. 初回表示時に DB からメッセージを取得 (GET)
  useEffect(() => {
    fetch("api/messages") // 先頭に / をつけない相対パス
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("データ取得エラー:", err));
  }, []);

  // 2. メッセージ送信処理 (POST)
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("api/messages", { // 先頭に / をつけない相対パス
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, text }),
    })
      .then((res) => res.json())
      .then((newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
        setText(""); // メッセージ欄のみクリア
      })
      .catch((err) => console.error("送信エラー:", err));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>💬 チャットアプリ</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="名前"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="メッセージ"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          送信
        </button>
      </form>

      <h2>送信されたメッセージ一覧</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {messages.map((m) => (
          <li
            key={m.id}
            style={{
              padding: "10px",
              borderBottom: "1px solid #ccc",
              marginBottom: "5px",
            }}
          >
            <strong>{m.username}</strong>: {m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;