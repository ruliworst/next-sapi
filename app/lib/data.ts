'use server';

import { sql } from '@vercel/postgres';
import { Task, User, Status, TaskRecord, TaskRecordDTO } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function createTask({ title, author, created }: { title: string, author: string, created: Date }): Promise<boolean> {
  noStore();
  const formattedDate = created.toISOString().slice(0, 19).replace('T', ' ');
  const status = Status.pending;
  try {
    const insertedTask = await sql`
      INSERT INTO tasks(title, author, created, status)
      VALUES (${title}, ${author}, ${formattedDate}, ${status})
      ON CONFLICT (id) DO NOTHING;
    `
    return insertedTask.rowCount > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create task.');
  }
}

export async function createTaskRecord(
  { user, observations, task }: { user: string, observations: string, task: string }
): Promise<TaskRecordDTO> {
  noStore();
  const start = new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    const insertTask = await sql<TaskRecord>`
      INSERT INTO task_records(userid, start, observations, task)
      VALUES (${user}, ${start}, ${observations}, ${task})
      ON CONFLICT (id) DO NOTHING
      RETURNING *;
    `
    const taskRecord = insertTask.rows[0];
    const taskRecordDTO = await fetchTaskRecordById(taskRecord.id);

    return taskRecordDTO;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to create task record.');
  }
}

export async function fetchTaskRecordById(taskRecordId: string): Promise<TaskRecordDTO> {
  try {
    const fetchTask = await sql<TaskRecordDTO>`
      SELECT tr.id, u.name, tr.start, tr."end", tr.observations
      FROM task_records as tr
      LEFT OUTER JOIN users as u ON tr.userid = u.id
      WHERE ${taskRecordId} = tr.id;
    `;
    return fetchTask.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch task record.');
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

export async function fetchUserById(id: string): Promise<User> {
  try {
    const data = await sql<User>`SELECT * FROM users WHERE id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchTasks(): Promise<Array<Task>> {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();
  try {
    const data = await sql<Task>`
      SELECT t.id, t.Title, u.name as author, t.created, t.status
      FROM tasks as t, users as u 
      WHERE t.author = u.id
      LIMIT 12;
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

export async function fetchTaskById(id: string): Promise<Task> {
  try {
    const data = await sql<Task>`
      SELECT t.id, t.title, u.name as author, t.created, t.status
      FROM tasks as t, users as u
      WHERE t.id = ${id} AND t.author = u.id;
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch task.');
  }
}

export async function deleteTaskById(id: string): Promise<boolean> {
  try {
    const data = await sql`
      DELETE FROM tasks WHERE id = ${id}
    `

    return data.rowCount > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete task.');
  }
}

export async function fetchTaskRecordsByTaskId(id: string): Promise<TaskRecordDTO[]> {
  try {
    const data = await sql<TaskRecordDTO>`
      SELECT tr.id, tr.start, tr."end", tr.observations, u.name
      FROM task_records as tr
      LEFT OUTER JOIN users as u ON tr.userid = u.id
      WHERE tr.task = ${id}
      LIMIT 10;
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to retrieve task records.');
  }
}

// TODO: Improve these methods.
export async function stopTaskRecord(taskRecord: TaskRecordDTO): Promise<TaskRecord> {
  const endDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  try {
    const data = await sql<TaskRecord>`
      UPDATE task_records
      SET "end" = ${endDate}
      WHERE id = ${taskRecord.id}
      RETURNING *;
    `
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update task record.');
  }
}