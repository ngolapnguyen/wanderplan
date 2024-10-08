import React, { useState } from 'react';
import { RichTextEditor, Map } from '../features';

export const Home: React.FC = () => {
  const [title, setTitle] = useState('');

  return (
    <div className='flex h-full p-8'>
      {/* Left column: Title and RichTextEditor */}
      <div className='w-1/2 h-full p-4 overflow-hidden flex flex-col'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='text-3xl font-bold mb-4 p-2 w-full focus:outline-none'
          placeholder='Your plan title'
        />
        <div className='flex-1 overflow-auto'>
          <RichTextEditor placeholder='Plan your trip...' />
        </div>
      </div>

      {/* Right column: Map */}
      <div className='w-1/2 h-full'>
        <Map />
      </div>
    </div>
  );
};
