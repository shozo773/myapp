import React from 'react';

function Footer() {
  return (
    <footer style={{
      marginTop: '40px',
      padding: '20px',
      textAlign: 'center',
      borderTop: '1px solid #eee',
      color: '#888',
      fontSize: '14px'
    }}>
      <p>© 2026 お金管理アプリ</p>
    </footer>
  );
}

// 💡 これが無い・間違っているのが原因でした！
export default Footer;