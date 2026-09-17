import { pgTable, text, serial, integer, boolean, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Category schema
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon"),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  slug: true,
  icon: true,
});

// Product schema
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl").notNull(),
  categorySlug: text("categorySlug").notNull(),
  brand: text("brand"),
  unit: text("unit"),
  features: text("features").array().notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  imageUrl: true,
  categorySlug: true,
  brand: true,
  unit: true,
  features: true,
});

// Store schema with South African retail & loyalty specifics
export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  productId: integer("productId").notNull(),
  price: doublePrecision("price").notNull(),
  loyaltyPrice: doublePrecision("loyaltyPrice"),
  loyaltyProgram: text("loyaltyProgram"), // e.g. "Xtra Savings", "Smart Shopper", "WRewards", "ClubCard"
  shippingInfo: text("shippingInfo"),
  deliverySpeed: text("deliverySpeed"), // e.g. "60 mins (Sixty60)", "Next-day", "2-3 days"
  productUrl: text("productUrl"),
  inStock: boolean("inStock").default(true),
});

export const insertStoreSchema = createInsertSchema(stores).pick({
  name: true,
  productId: true,
  price: true,
  loyaltyPrice: true,
  loyaltyProgram: true,
  shippingInfo: true,
  deliverySpeed: true,
  productUrl: true,
  inStock: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertStore = z.infer<typeof insertStoreSchema>;
export type Store = typeof stores.$inferSelect;