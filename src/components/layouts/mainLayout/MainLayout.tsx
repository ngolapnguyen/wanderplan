import React, { useState } from 'react';

// Define the prop types for the MainLayout component
export interface MainLayoutProps {
  children: React.ReactNode;
}

// MainLayout component: Provides a consistent layout structure for the application
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // State to manage the open/closed state of the drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle the drawer state
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Array of menu items
  const menuItems = [
    { label: 'Note 1', href: '#' },
    { label: 'Note 2', href: '#' },
    { label: 'Note 3', href: '#' },
  ];

  return (
    // Main container with flex column layout and full minimum height
    <div className='flex flex-col min-h-screen'>
      {/* Header section */}
      <header className='bg-blue-600 text-white p-4'>
        <div className='flex items-center justify-between'>
          {/* Left section: Hamburger menu, Logo, and Navigation menu */}
          <div className='flex items-center space-x-4'>
            {/* Hamburger menu button */}
            <button onClick={toggleDrawer} className='text-2xl'>
              ☰
            </button>
            {/* Logo */}
            <div className='text-xl font-bold'>Wanderplan</div>
            {/* Navigation menu */}
            <nav className='hidden md:flex space-x-4'>
              {menuItems.map((item, index) => (
                <a key={index} href={item.href} className='hover:underline'>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right section: User avatar placeholder */}
          <div className='w-8 h-8 bg-gray-300 rounded-full'></div>
        </div>
      </header>

      {/* Main content area */}
      <div className='flex flex-grow'>
        {/* Drawer - conditionally rendered based on isDrawerOpen state */}
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
        {/* Main content - renders the children passed to the layout */}
        <main className='flex-grow'>{children}</main>
      </div>
    </div>
  );
};
