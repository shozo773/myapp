import React from 'react';
import { Navigation } from './Navigation'; // { } を使って読み込む

export const Footer = () => {
  return (
    <footer>
      <Navigation />
      <small>&copy; 2025</small>
    </footer>
  );
};