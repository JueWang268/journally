"use server"
import { sql } from "@vercel/postgres";
import { Goal } from "../lib/definitions";

const test_user_id = '410544b2-4001-4271-9855-fec4b6a6442a';

export async function fetchGoals(userId: string): Promise<Goal[]> {
    try {
      // Fetch all goals for the given user
      const data = await sql<Goal>`
        SELECT 
          id,
          category,
          number,
          unit,
          frequency,
          modified_at
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
    category: string, 
    value: number, 
    unit: string, 
    frequency: number) {
    try {
      const data = await sql<Goal>`
        INSERT INTO goals (id, category, user_id, value, unit, frequency, modified_at)
        VALUES (gen_random_uuid(), ${category}, ${userId}, ${value}, ${unit}, ${frequency}, ${Date()})
        RETURNING *
      `;
      return data.rows[0];
    } catch (error) {
        console.error('Error creating and inserting goal:', error);
        throw new Error(`Failed to insert goal "${category}".`);
    }
}