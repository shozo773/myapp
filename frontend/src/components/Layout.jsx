import React from 'react';

// 📦 共通の枠となるラッパーコンポーネント
export const Layout = (props) => {
  return (
    <div style={{ border: '3px double #4ea1d3', padding: '20px', margin: '10px', borderRadius: '10px' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
        <strong>【共通ヘッダー】アプリの枠組み</strong>
      </header>

      {/* 🌟 タグで囲まれた中身がここにはめ込まれる */}
      <main>
        {props.children}
      </main>

      <footer style={{ marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #ccc', fontSize: '12px' }}>
        <small>© 2026 共通フッター</small>
      </footer>
    </div>
  );
};