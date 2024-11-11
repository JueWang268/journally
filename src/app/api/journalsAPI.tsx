"use server";
import { sql } from "@vercel/postgres";
import { Journals } from "../lib/definitions";
import { ISODate } from "../utils/ISODate";
import { journals } from "../lib/placeholder-data";

const date = new Date();
const formattedDate = date.toISOString().split("T")[0];

// to drop the tag column: DROP COLUMN tag;
// await sql`
//   ALTER TABLE journals
//   ADD COLUMN tag VARCHAR(255);
// `;

// print the table to console
const data = await sql<Journals>`SELECT * FROM journals`;
console.log("Fetched Journals Data:", data.rows);

export async function fetchJournals(userId: string) {
  try {
    const data = await sql<Journals>`
      SELECT * FROM journals
      WHERE user_id = ${userId}
    `;
    console.log("Fetched Journals Data:", data.rows);
    return data.rows;
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch journals.");
  }
}

export async function readJournal(id: string) {
  try {
    const data = await sql<Journals>`SELECT * FROM journals WHERE id = ${id}`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch journal with id ${id}.`);
  }
}

// added tag to parameters and to the "INSERT INTO" and "VALUES"
export async function createJournal(
  title: string,
  userId: string,
  tag: string
) {
  try {
    const data = await sql<Journals>`
          INSERT INTO journals (id, title, date, user_id, tag)
          VALUES (gen_random_uuid(), ${title}, ${formattedDate}, ${userId}, ${tag})
          RETURNING *
        `;

    // return the latest journal
    return data.rows[0];
  } catch (error) {
    console.error("Error creating and inserting journal:", error);
    throw new Error(`Failed to create journal "${title}".`);
  }
}

// add tag
export async function addTag(id: string, tag: string) {
  try {
    const data = await sql<Journals>`
      UPDATE journals
      SET tag = ${tag}
      WHERE id = ${id}
      RETURNING *;
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Error adding tag:", error);
    throw new Error(`Failed to add tag to journal with id "${id}".`);
  }
}

// delete tag
export async function deleteTag(id: string) {
  try {
    const data = await sql<Journals>`
      UPDATE journals
      SET tag = NULL
      WHERE id = ${id}
      RETURNING *;
    `;

    return data.rows[0];
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw new Error(`Failed to delete tag for journal with id "${id}".`);
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
  } catch (error) {
    console.error("Database Error:", error);
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
    console.error("Database Error:", error);
    throw new Error(`Failed to delete journal ${id}.`);
  }
}
