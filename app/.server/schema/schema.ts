import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todoSchema = sqliteTable('todos', {
    id: text('id').notNull().primaryKey().unique(),
    message: text('message').notNull(),
});


export const sessionSchema = sqliteTable('sessions', { 
    id: text('id').notNull().primaryKey().unique(),
    user_id: text('user_id').notNull(),
    expires: text('expires').notNull(),
});

export const userSchema = sqliteTable('users', {
    id: text('id').notNull().primaryKey().unique(),
    username: text('username').notNull().unique(),
    password: text('password').notNull(),
});