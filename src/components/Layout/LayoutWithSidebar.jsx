import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const LayoutWithSidebar = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <main className="flex-1 pl-64 overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutWithSidebar;
