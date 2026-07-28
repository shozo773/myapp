import React, { useState } from 'react';

function InputForm({ onAddItem }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) {
      alert('内容と金額を入力してください');
      return;
    }

    // 親の handleAddItem を実行
    onAddItem({
      id: Date.now(),
      title: title,
      amount: Number(amount),
      type: type
    });

    // フォームをリセット
    setTitle('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h4>新規データを追加</h4>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="内容（例：バイト、マック）"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="number"
          placeholder="金額（円）"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '8px' }}>
          <option value="income">収入 (プラス)</option>
          <option value="expense">支出 (マイナス)</option>
        </select>
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        追加する
      </button>
    </form>
  );
}

export default InputForm;