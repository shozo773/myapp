import React from 'react';

const TotalBalance = (props) => {
  return (
    <div style={{ backgroundColor: '#e2f0d9', border: '1px solid #a9d18e', padding: '15px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
      <h2 style={{ margin: 0, color: '#385723' }}>現在の合計支出: {props.total} 円</h2>
    </div>
  );
};

export default TotalBalance;