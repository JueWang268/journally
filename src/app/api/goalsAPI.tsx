"use server"
import { sql } from "@vercel/postgres";
import { Goal } from "../lib/definitions";

const test_user_id = '410544b2-4001-4271-9855-fec4b6a6442a';

export async function readGoals(userId: string): Promise<Goal[]> {
  try {
    // Fetch all goals for the given user
    const data = await sql<Goal>`
      SELECT 
        *
      FROM 
        Goals
      WHERE 
        user_id = ${userId};
    `;
    return data.rows;

  } catch (error) {
    console.error('Error fetching goals:', error);
    throw new Error(`Failed to fetch goals: ${error}`);
  }
}


export async function createGoal(
    userId: string, 
    name: string, 
    category: string,
    value: number, 
    frequency: number) {
    try {
      const data = await sql<Goal>`
        INSERT INTO goals (id, category, name, user_id, value, frequency)
        VALUES (gen_random_uuid(), ${category}, ${name}, ${userId}, ${value}, ${frequency})
        RETURNING *
      `;
      return data.rows[0];
    } catch (error) {
        console.error('Error creating and inserting goal:', error);
        throw new Error(`Failed to insert goal with "${category}, ${name}, ${userId}, ${value}, ${frequency}".`);
    }
}

export async function updateGoal(
  id: string, newName: string, newCat:string, newVal: number, newFreq: number
) 
  {
  try {
    const data = await sql<Goal>`
        UPDATE goals
        SET 
          name = ${newName}, 
          category =${newCat},
          value = ${newVal}, 
          frequency = ${newFreq},
          modified_at = ${(new Date()).toISOString()}
        WHERE id = ${id}
        RETURNING *;
        `;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to update goal for ${newCat}`);
  }
}

export async function deleteGoal(id: string) {
  try {
    const data = await sql<Goal>`
      DELETE FROM goals
      WHERE id = ${id}
      RETURNING *;
    `;

    // incase of need
    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to delete goal ${id}.`);
  }
}
