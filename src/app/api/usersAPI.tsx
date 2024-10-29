"use server";
import { sql } from "@vercel/postgres";
import { Users } from "../lib/definitions";

const date = new Date();
const formattedDate = date.toISOString().split("T")[0];

export async function createUser(
  id: string,
  name: string,
  email: string,
  password: string // maybe do not need this
) {
  try {
    const data = await sql<Users>`
        INSERT INTO users (id, name, email, password)
        VALUES (${id}, ${name}, ${email}, ${password})
        RETURNING *
      `;
    return data.rows[0]; // return the created user
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
    return data.rows[0]; // return the deleted user
  } catch (error) {
    console.error(`Error deleting user with id "${id}":`, error);
    throw new Error(`Failed to delete user "${id}".`);
  }
}

export async function updateUser(
  id: string,
  name: string,
  email: string,
  password: string
) {
  try {
    const data = await sql<Users>`
        UPDATE users
        SET name = ${name}, email = ${email}, date = ${password}
        WHERE id = ${id}
        RETURNING *
        `;
    return data.rows[0]; // return the updated user
  } catch (error) {
    console.error(`Error updating user with id "${id}":`, error);
    throw new Error(`Failed to update user "${id}".`);
  }
}
