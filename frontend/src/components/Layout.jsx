import React from 'react';

function Layout({ children }) {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '30px auto',
      padding: '0 20px',
      fontFamily: 'sans-serif'
    }}>
      {children}
    </div>
  );
}

// 💡 これを追加・修正します
export default Layout;