// lib/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection fails
});

// Drizzle instance
export const db = drizzle(pool, { schema });

// Export tables for use in queries
export const { users, products, cartItems } = schema;

// Helper to connect to database
export async function connectDB() {
  try {
    await pool.connect();
    console.log('✅ Database connected');
    return pool;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

// Helper to disconnect from database
export async function disconnectDB() {
  await pool.end();
  console.log('📴 Database disconnected');
}

// Type helpers - Get types from the schema
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
