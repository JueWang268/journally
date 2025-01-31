"use server";
import { sql } from "@vercel/postgres";
import { Users } from "../lib/definitions";
import { users } from "../lib/placeholder-data";

const initializeSchema = async () => {
  try {
    // add settings column if it doesn't exist
    await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'users'
          AND column_name = 'settings'
        ) THEN
          ALTER TABLE users
          ADD COLUMN settings JSONB;
        END IF;
      END
      $$;
    `;

    // if settings exists
    await sql`
      UPDATE users
      SET settings = COALESCE(
        settings,
        jsonb_build_object(
          'account', jsonb_build_object(
            'name', name,
            'birth', NULL,
            'gender', NULL,
            'email', email,
            'phone', NULL
          ),
          'notification', jsonb_build_object(
            'email', false,
            'sms', false,
            'push', false
          )
        )
      );
    `;
  } catch (error) {
    console.error("Error initializing schema:", error);
    throw new Error("Failed to initialize database schema.");
  }
};

initializeSchema();
const data = await sql<Users>`SELECT * FROM users`;
console.log("Fetched Users Data:", data.rows);


export async function fetchUser(id: string) {
  try {
    const data = await sql<Users>`
      SELECT * FROM users
      WHERE id = ${id}
    `;
    console.log("Feteched User Data:", data.rows[0]);
    return data.rows[0];
  } catch (error) {
    console.error("Fetching Error:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function createUser(id: string, name: string, email: string, password: string) {
  try {
    const data = await sql<Users>`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${password})
      RETURNING *
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Error creating and inserting user:", error);
    throw new Error(`Failed to create user "${id}".`);
  }
}

export async function deleteUser(id: string) {
  try {
    const data = await sql<Users>`
      DELETE FROM users
      WHERE id = ${id}
      RETURNING *
    `;
    return data.rows[0];
  } catch (error) {
    console.error(`Error deleting user with id "${id}":`, error);
    throw new Error(`Failed to delete user "${id}".`);
  }
}

export async function updateUser(id: string, settings: object) {
  try {
    const account = settings['account'] || {};
    const name = account['name'];
    const email = account['email'];

    const data = await sql<Users>`
      UPDATE users
      SET 
        settings = ${JSON.stringify(settings)}::jsonb,
        name = ${name},
        email = ${email}
      WHERE id = ${id}
      RETURNING *
    `;
    return data.rows[0];
  } catch (error) {
    console.error(`Error updating user with id "${id}":`, error);
    throw new Error(`Failed to update user "${id}".`);
  }
}

