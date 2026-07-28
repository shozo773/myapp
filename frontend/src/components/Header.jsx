import React from 'react';

function Header({ title }) {
  return (
    <header style={{
      backgroundColor: '#3182ce',
      color: 'white',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 'bold' }}>
        💰 {title || 'Money Tracker (お小遣い帳)'}
      </h1>
    </header>
  );
}

export default Header;