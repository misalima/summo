import { neon } from '@neondatabase/serverless';

export async function getNeonDB() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

