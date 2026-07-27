import React from 'react';

const ExpenseItem = (props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '12px 8px' }}>
      <div>
        <span style={{ color: '#888', marginRight: '15px' }}>{props.date}</span>
        <strong style={{ fontSize: '16px' }}>{props.title}</strong>
      </div>
      <div>
        <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '15px', color: '#c00000' }}>
          {props.amount.toLocaleString()} 円
        </span>
        <button style={{ padding: '4px 8px', backgroundColor: '#f2dede', color: '#a94442', border: '1px solid #ebccd1', borderRadius: '4px', cursor: 'pointer' }}>
          削除
        </button>
      </div>
    </div>
  );
};

export default ExpenseItem;