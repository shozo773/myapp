import React from 'react';

// 関数の前に直接 export をつける
export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><a href="#jsx">JSX</a></li>
        <li><a href="#component">コンポーネント</a></li>
        <li><a href="#event">イベント</a></li>
      </ul>
    </nav>
  );
};