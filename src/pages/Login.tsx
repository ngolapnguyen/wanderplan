import React from 'react';
import { FcGoogle } from 'react-icons/fc';

export const LoginLayout: React.FC = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-md p-8 space-y-4 '>
        <h1 className='text-2xl font-bold text-center mb-8 text-nowrap'>
          Log in to Wanderplan
        </h1>

        <button className='w-full bg-white hover:bg-gray-100 border text-black flex items-center justify-center space-x-2 py-4 rounded-md transition duration-300 ease-in-out'>
          <FcGoogle className='w-5 h-5 ' />
          <span>Continue with Google</span>
        </button>
      </div>
    </div>
  );
};
