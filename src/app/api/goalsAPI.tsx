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
  frequency: number,
  start_date?: Date | null,
  end_date?: Date | null,
  unit?: string | null
) {
  try {
    // Construct the SQL query dynamically based on 
    // whether start_date and end_date are provided
    const query = sql<Goal>`
      INSERT INTO goals (
        id,
        category,
        name,
        user_id,
        value,
        frequency,
        ${start_date !== undefined && start_date !== null ? `start_date` : ``},
        ${end_date !== undefined && end_date !== null ? `end_date` : ``},
        ${unit !== undefined && unit !== null ? `unit` : ``}
      )
      VALUES (
        gen_random_uuid(),
        ${category},
        ${name},
        ${userId},
        ${value},
        ${frequency},
        ${start_date !== undefined && start_date !== null ? `${start_date}` : ``},
        ${end_date !== undefined && end_date !== null ? `${end_date}` : ``},
        ${unit !== undefined && unit !== null ? `${unit}` : ``}
      )
      RETURNING *
    `;

    const data = await query;
    return data.rows[0];
  } catch (error) {
    console.error('Error creating and inserting goal:', error);
    throw new Error(`Failed to insert goal with "
      ${category}, ${name}, ${userId}, ${value}, ${frequency}".`);
  }
}

export async function updateGoal(
  id: string, 
  newName: string, 
  newCat:string, 
  newVal: number,
  newFreq: number,
  newStart?: Date | null,
  newEnd? : Date | null,
  nunit? : string | null
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
          modified_at = ${(new Date()).toISOString()},
          ${newStart !== undefined && newStart !== null ? `start_date = ${newStart}` : ``},
          ${newEnd !== undefined && newEnd !== null ? `end_date = ${newEnd}` : ``},
          ${nunit !== undefined && nunit !== null ? `unit = ${nunit}` : ``}
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
