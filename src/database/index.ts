import { PGlite } from '@electric-sql/pglite';
import { live } from '@electric-sql/pglite/live';
import { electricSync } from '@electric-sql/pglite-sync';
import { drizzle } from 'drizzle-orm/pglite';
import { planContent } from './schema/schema';

export type PGliteWithLive = PGlite & { live: unknown };

let pgInstance: PGliteWithLive;
let dbInstance: ReturnType<typeof drizzle>;

export const initDatabase = async () => {
  if (!pgInstance) {
    try {
      pgInstance = (await PGlite.create({
        dataDir: 'idb://wanderplan-db',
        extensions: {
          electric: electricSync(),
          live,
        },
      })) as PGliteWithLive;

      // Wait for the PGlite instance to be ready
      while (!pgInstance.ready) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Create the table using the exec function
      await pgInstance.exec(`
        CREATE TABLE IF NOT EXISTS plan_content (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          content TEXT NOT NULL,
          last_modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          vector_clock JSONB NOT NULL
        );
      `);

      // Initialize Drizzle ORM with schema
      dbInstance = drizzle(pgInstance, { schema: { planContent } });

      // Log the contents of the plan_content table using Drizzle
      const result = await dbInstance.select().from(planContent).execute();
      console.log('Contents of plan_content table:', result);

      console.log(
        'Database initialized, table created, and ORM wrapper initialized successfully'
      );
    } catch (error) {
      console.error('Error initializing database:', error);
      throw new Error('Failed to initialize database');
    }
  }

  return { pg: pgInstance, db: dbInstance };
};

export const getDatabase = async () => {
  if (!pgInstance || !dbInstance) {
    return initDatabase();
  }
  return { pg: pgInstance, db: dbInstance };
};
