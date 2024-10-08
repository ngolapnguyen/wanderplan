import React, {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react';
import { getDatabase, PGliteWithLive } from './index';

const DatabaseContext = createContext<PGliteWithLive | null>(null);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [db, setDb] = useState<PGliteWithLive | null>(null);

  useEffect(() => {
    getDatabase().then(({ pg }) => setDb(pg));
  }, []);

  if (!db) {
    return <div>Loading database...</div>;
  }

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
};

export const usePGlite = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('usePGlite must be used within a DatabaseProvider');
  }
  return context;
};
