import React, { useState } from 'react';
import { MainLayout } from './components/layouts';
import { RichTextEditor } from './features';

const App: React.FC = () => {
  const [title, setTitle] = useState('');

  return (
    <MainLayout>
      <div className='flex flex-col h-full p-4'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='text-3xl font-bold mb-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500'
          placeholder='Untitled'
        />
        <div className='flex-grow overflow-auto'>
          <RichTextEditor placeholder='Plan your trip...' />
        </div>
      </div>
    </MainLayout>
  );
};

export default App;
