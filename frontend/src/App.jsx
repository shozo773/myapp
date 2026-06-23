const App = () => {
  // 💡 遠藤さんのアプリで扱うタスク（データの配列）を作りました！
  const myTasks = [
    "大学のレポートを提出する",
    "バイトのシフト連絡をする",
    "ITパスポートの勉強をする",
    "Reactの課題を終わらせる"
  ];

  return (
    <div>
      <h1>遠藤のタスク管理アプリ（mapテスト）</h1>
      <h2>現在のタスク一覧</h2>
      
      {/* 💡 map() を使って、配列の中身を自動で <li> タグに変換して並べます */}
      <ul>
        {myTasks.map((task, index) => (
          <li key={index} style={{ fontSize: "18px", margin: "10px 0" }}>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;