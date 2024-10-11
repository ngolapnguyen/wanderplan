import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import {
  initDatabase,
  DatabaseContextType,
} from '../database/DatabaseProvider';

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [database, setDatabase] = useState<DatabaseContextType | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const db = await initDatabase();
      setDatabase(db);
    };
    initialize();
  }, []);

  if (!database) {
    return <div>Loading database...</div>;
  }

  return (
    <DatabaseContext.Provider value={database}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
