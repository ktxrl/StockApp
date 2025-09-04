import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;