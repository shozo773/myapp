import React from 'react';

function ExpenseItem({ item, onDelete }) {
  // item がない場合のフォールバック（エラー防止）
  if (!item) return null;

  // 金額が未設定の場合は 0 にする（toLocaleString のエラーを防止）
  const amount = item.amount ?? 0;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px',
      borderBottom: '1px solid #eee',
      backgroundColor: '#f9f9f9',
      marginBottom: '8px',
      borderRadius: '4px'
    }}>
      <div>
        {item.date && <span style={{ color: '#888', marginRight: '15px' }}>{item.date}</span>}
        <strong style={{ fontSize: '16px' }}>{item.title || '（名称なし）'}</strong>
      </div>
      <div>
        <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '15px' }}>
          {item.type === 'income' ? '＋' : '－'}￥{amount.toLocaleString()}
        </span>
        <button
          onClick={() => onDelete && onDelete(item.id)}
          style={{
            padding: '4px 8px',
            backgroundColor: '#f2dede',
            color: '#a94442',
            border: '1px solid #ebccd1',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          削除
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;