import { sql } from '@vercel/postgres';
import { Entries } from '../lib/definitions';

export async function createEntry(journalId: string, title: string, content: string) {
    try {
      const data = await sql<Entries>`
        INSERT INTO entries (id, journal_id, title, content, date)
        VALUES (gen_random_uuid(), ${journalId}, ${title}, ${content}, ${Date()})
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
