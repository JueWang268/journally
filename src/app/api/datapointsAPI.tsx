"use server"
import { sql } from "@vercel/postgres";
import { Datapoints } from "../lib/definitions";
import { ISODate } from "../utils/ISODate";


export async function createDp(userId: string, name: string, value: number) {
    try {
      const data = await sql<Datapoints>`
        INSERT INTO datapoints (id, user_id, name, value, date)
        VALUES (gen_random_uuid(), ${userId}, ${name}, ${value}, ${ISODate})
        RETURNING *
      `;
      return data.rows[0]; // return the created entry
    } catch (error) {
        console.error('Error creating and inserting datapoint:', error);
        throw new Error(`Failed to insert datapoint "${name}".`);
    }
}

export async function readDp (userId: string) {
    try {
        const data = await sql<Datapoints>`
          SELECT * FROM datapoints WHERE user_id = ${userId};
        `;
        return data.rows; 
      } catch (error) {
          console.error('Error reading datapoint:', error);
          throw new Error(`Failed to read datapoint".`);
      }
    }
    
export async function readGroupedDp (userId: string) {
  try {
      const data = await sql<Datapoints>`
        SELECT 
            name, 
            ARRAY_AGG(jsonb_build_object('date', date, 'value', value)) AS data
        FROM 
            datapoints
        GROUP BY 
            name;
      `;
      return data.rows; 
    } catch (error) {
        console.error('Error reading datapoints:', error);
        throw new Error(`Failed to read datapoints".`);
    }

}
