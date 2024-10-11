import React from 'react';

export const LoadingDots: React.FC = () => (
  <div className='w-full min-h-screen flex items-center justify-center'>
    <div className='flex space-x-2 justify-center items-center h-5'>
      <div
        className={`h-8 w-8 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]`}
      ></div>
      <div
        className={`h-8 w-8 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]`}
      ></div>
      <div className={`h-8 w-8 bg-gray-300 rounded-full animate-bounce`}></div>
    </div>
  </div>
);
