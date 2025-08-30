import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;