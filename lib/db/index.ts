// lib/db/index.ts - SQLITE VERSION
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

// Create SQLite connection
const client = createClient({
  url: 'file:sqlite.db',  // Local SQLite file
});

// Create Drizzle instance
export const db = drizzle(client, { schema });

// Export tables
export const { users, products, cartItems } = schema;

// Type helpers
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;

// Helper functions
export async function connectDB() {
  console.log('✅ SQLite database connected');
  return client;
}

export async function disconnectDB() {
  console.log('📴 SQLite database disconnected');
}