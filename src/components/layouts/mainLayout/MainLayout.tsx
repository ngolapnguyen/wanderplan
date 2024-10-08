import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    console.log('MainLayout mounted');
    console.log('Children:', children);
  }, [children]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { label: 'Note 1', href: '#' },
    { label: 'Note 2', href: '#' },
    { label: 'Note 3', href: '#' },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='bg-white text-black p-4 border-b-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <button onClick={toggleDrawer} className='text-2xl'>
              ☰
            </button>
            <div className='text-xl font-bold'>Wanderplan</div>
            <nav className='hidden md:flex space-x-4'>
              {menuItems.map((item, index) => (
                <a key={index} href={item.href} className='hover:underline'>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
        </div>
      </header>
      <div className='flex h-[calc(100vh-4rem)]'>
        {isDrawerOpen && (
          <div className='bg-gray-100 w-64 p-4'>
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className='block py-2 hover:bg-gray-200'>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <main className='w-full h-full overflow-auto'>
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
};
