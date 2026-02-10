// lib/db/schema.ts
import {
  pgTable,
  text,
  varchar,
  integer,
  decimal,
  boolean,
  timestamp,
  uuid,
  primaryKey
} from 'drizzle-orm/pg-core';

// ====================
// SIMPLIFIED SCHEMA
// ====================

// Users table - stores user information
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  name: varchar('name', { length: 255 }),
  password: text('password').notNull(),
   mobile: varchar('mobile', { length: 11 }), // 
  role: varchar('role', { length: 20 }).default('USER'), // 'USER' or 'ADMIN'
  createdAt: timestamp('created_at').defaultNow(),
});

// Categories table - stores product categories
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).unique().notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Products table - stores products for sale
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // 10 digits total, 2 decimal places
  stock: integer('stock').default(0),
  imageUrl: text('image_url'), // Single image for simplicity
  categoryId: uuid('category_id').references(() => categories.id),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Cart items table - stores items in user's shopping cart
export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  productId: uuid('product_id').references(() => products.id),
  quantity: integer('quantity').default(1).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Orders table - stores completed orders
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  // Simple status: 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
  status: varchar('status', { length: 20 }).default('pending'),
  shippingAddress: text('shipping_address'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Order items table - stores individual items in an order
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id),
  productId: uuid('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(), // Price at time of purchase
  createdAt: timestamp('created_at').defaultNow(),
});

// Reviews table - stores product reviews
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id),
  userId: uuid('user_id').references(() => users.id),
  rating: integer('rating').notNull().check({ min: 1, max: 5 }),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});