import { useState, useEffect } from "react";

function App() {
  // 初期値は必ず空配列 [] にする
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  // 初回表示時に DB から一覧を取得
  useEffect(() => {
    // 💡【重要】ポータブルにするため先頭に / を付けずに 'api/messages' にする
    fetch("api/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => console.error("取得エラー:", err));
  }, []);

  // フォーム送信時に DB に追加
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, text }),
    })
      .then((res) => res.json())
      .then((newMessage) => {
        setMessages([...messages, newMessage]);
        setText(""); // メッセージ入力欄をクリア
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