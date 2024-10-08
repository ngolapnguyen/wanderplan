import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DatabaseProvider } from './database/provider';
import { initDatabase } from './database/index';

const Root: React.FC = () => {
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        setIsDbInitialized(true);
      } catch (err) {
        console.error('Failed to initialize database:', err);
      }
    };

    init();
  }, []);

  if (!isDbInitialized) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center'>
        <div className='flex space-x-2 justify-center items-center h-5'>
          <div
            className={`h-8 w-8 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]`}
          ></div>
          <div
            className={`h-8 w-8 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]`}
          ></div>
          <div
            className={`h-8 w-8 bg-gray-300 rounded-full animate-bounce`}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <DatabaseProvider>
        <App />
      </DatabaseProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('Service Worker registration failed: ', registrationError);
      });
  });
}
