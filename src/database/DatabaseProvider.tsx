import { PGlite } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';
import { electricSync } from '@electric-sql/pglite-sync';
import { drizzle } from 'drizzle-orm/pglite';
import { planContent } from './schema/schema';

export type PGliteWithLive = PGlite & { live: unknown };

export type DatabaseContextType = {
  pg: PGliteWithLive | null;
  db: ReturnType<typeof drizzle> | null;
};

let pgInstance: PGliteWithLive;
let dbInstance: ReturnType<typeof drizzle>;

export const initDatabase = async (): Promise<DatabaseContextType> => {
  if (!pgInstance) {
    try {
      pgInstance = (await PGlite.create({
        dataDir: 'idb://wanderplan-db',
        extensions: {
          electric: electricSync(),
          live,
        },
      })) as PGliteWithLive;

      while (!pgInstance.ready) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      await pgInstance.exec(`
        CREATE TABLE IF NOT EXISTS plan_content (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          content TEXT NOT NULL,
          last_modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          vector_clock JSONB NOT NULL
        );
      `);

      dbInstance = drizzle(pgInstance, { schema: { planContent } });

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw new Error('Failed to initialize database');
    }
  }

  return { pg: pgInstance, db: dbInstance };
};
