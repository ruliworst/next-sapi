'use server';

import { QueryResult, sql } from '@vercel/postgres';
import { Task, User } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function createTask({ title, author }: { title: string, author: string }) {
  noStore();

  try {
    const insertedTask = await sql`
      INSERT INTO tasks(title, author)
      VALUES (${title}, ${author})
      ON CONFLICT (id) DO NOTHING;
    `
    console.log('Created task.');

    return insertedTask;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create task.');
  }
}

export async function fetchUsers(): Promise<Array<User>> {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data = await sql<User>`SELECT * FROM users`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}