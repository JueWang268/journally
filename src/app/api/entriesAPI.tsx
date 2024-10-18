"use server"
import { sql } from '@vercel/postgres';
import { Entries } from '../lib/definitions';

const date = new Date();
const formattedDate = date.toISOString().split('T')[0];

export async function createEntry(journalId: string, title: string, content: string) {
    try {
      const data = await sql<Entries>`
        INSERT INTO entries (id, journal_id, title, content, date)
        VALUES (gen_random_uuid(), ${journalId}, ${title}, ${content}, ${formattedDate})
        RETURNING *
      `;
      return data.rows[0]; // return the created entry
    } catch (error) {
        console.error('Error creating and inserting entry:', error);
        throw new Error(`Failed to create entry "${title}".`);
    }
}

export async function getEntry(entryId: string) {
    try {
        const data = await sql<Entries>`
        SELECT * FROM entries
        WHERE id = ${entryId}
        `;
        return data.rows[0]; // return the fetched entry
    } catch (error) {
        console.error(`Error fetching entry with id "${entryId}":`, error);
        throw new Error(`Failed to fetch entry with id "${entryId}".`);
    }
}

export async function getJournalEntries(journalId: string) {
    try {
        const data = await sql<Entries>`
        SELECT * FROM entries
        WHERE journal_id = ${journalId}
        `;
        return data.rows; 
    } catch (error) {
        console.error(`Error fetching entries in journal "${journalId}":`, error);
        throw new Error(`Failed to fetch entries in journal "${journalId}".`);
    }
}
export async function deleteEntry(entryId: string) {
    try {
      const data = await sql<Entries>`
        DELETE FROM entries
        WHERE id = ${entryId}
        RETURNING *
      `;
      return data.rows[0]; // return the deleted entry
    } catch (error) {
        console.error(`Error deleting entry with id "${entryId}":`, error);
        throw new Error(`Failed to delete entry "${entryId}".`);
    }
}

export async function updateEntry(entryId: string, title: string, content: string, date: string) {
    try {
        const data = await sql<Entries>`
        UPDATE entries
        SET title = ${title}, content = ${content}, date = ${date}
        WHERE id = ${entryId}
        RETURNING *
        `;
        return data.rows[0]; // return the updated entry
    } catch (error) {
        console.error(`Error updating entry with id "${entryId}":`, error);
        throw new Error(`Failed to update entry "${entryId}".`);
    }
}
