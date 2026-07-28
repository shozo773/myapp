import React from 'react';

function TotalBalance({ items }) {
  // 収入と支出の合計を計算
  const total = items.reduce((acc, item) => {
    return item.type === 'income' ? acc + item.amount : acc - item.amount;
  }, 0);

  return (
    <div style={{ padding: '16px', backgroundColor: '#e9ecef', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
      <h3 style={{ margin: 0, color: '#495057' }}>現在の残高</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '8px 0 0', color: total >= 0 ? '#28a745' : '#dc3545' }}>
        ￥{total.toLocaleString()}
      </p>
    </div>
  );
}

export default TotalBalance;