import React, {ReactNode} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-netflix-black min-h-screen text-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="ml-16 md:ml-48 w-full p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;