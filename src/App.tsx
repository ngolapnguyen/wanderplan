import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { LoadingDots } from './components/loading';
import { DatabaseProvider, useDatabase } from './hooks/useDatabase';

const AppContent: React.FC = () => {
  const database = useDatabase();

  if (!database) {
    return <LoadingDots />;
  }

  return <RouterProvider router={router} />;
};

const App: React.FC = () => {
  return (
    <DatabaseProvider>
      <AppContent />
    </DatabaseProvider>
  );
};

export default App;
