import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const createDrizzleConnection = (
  connectionString: string,
  schema: Record<string, unknown>,
) => {
  // create a connection pool and drizzle instance
  const pool = new Pool({
    connectionString,
  });

  return drizzle({
    client: pool,
    schema,
  });
};

export { createDrizzleConnection };
