"use server"
import { sql } from '@vercel/postgres';
import { Journals } from '../lib/definitions';

const date = new Date();
const formattedDate = date.toISOString().split('T')[0];



export async function fetchJournals() {
  console.log(process.env.POSTGRES_DATABASE);
  
  try {
    const data = await sql<Journals>`SELECT * FROM journals`;
    return data.rows;

  } catch (error) {
    console.error('Fetching Error:', error);
    throw new Error('Failed to fetch journals.');
  }
}

export async function readJournal(id: string) {
  try {
    const data = await sql<Journals>`SELECT * FROM journals WHERE id = ${id}`;
    return data.rows[0];

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch journal with id ${id}.`);
  }
}

export async function createJournal(title: string, userId: string) {
    try {
        const data = await sql<Journals>`
        INSERT INTO journals (id, title, date, user_id)
        VALUES (gen_random_uuid(), ${title}, ${formattedDate}, ${userId})
        RETURNING *
        `;

        // return the latest journal
        return data.rows[0]
        
      } catch (error) {
        console.error('Error creating and inserting journal:', error);
        throw new Error(`Failed to create journal "${title}".`);
      }
}

export async function updateJournal(id: string, newTitle: string) {

    try {
        const data = await sql<Journals>`
        UPDATE journals
        SET title = ${newTitle}
        WHERE id = ${id}
        RETURNING *;
        `;

        return data.rows[0];
    }

    catch (error) {
        console.error('Database Error:', error);
        throw new Error(`Failed to update journal ${newTitle}`);
    }
}

export async function deleteJournal(id: string) {
  try {
    const data = await sql<Journals>`
      DELETE FROM journals
      WHERE id = ${id}
      RETURNING *;
    `;

    // incase of need
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to delete journal ${id}.`);
  }
}
