import React from 'react';

const InputForm = () => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ marginTop: 0 }}>新しい収支の入力</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input type="date" style={{ padding: '8px' }} />
        <input type="text" placeholder="品目（例: カフェ代）" style={{ padding: '8px', flex: 1 }} />
        <input type="number" placeholder="金額（円）" style={{ padding: '8px', width: '120px' }} />
        <button style={{ padding: '8px 16px', backgroundColor: '#4ea1d3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          追加する
        </button>
      </div>
    </div>
  );
};

export default InputForm;