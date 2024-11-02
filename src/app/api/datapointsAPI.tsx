"use server"
import { sql } from "@vercel/postgres";
import { Datapoints, GroupedDatapoints } from "../lib/definitions";
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
    
    const data = await sql<GroupedDatapoints>`
      SELECT
          name,
          ARRAY_AGG(jsonb_build_object('id', id, 'date', date, 'value', value)) AS data
      FROM
          datapoints
      WHERE 
        user_id = ${userId}
      GROUP BY
         name;
    `;
    console.log(`api data looks like ${data.rows}!`);

    const grouped = data.rows.reduce((acc, { name, data }) => {
      acc[name] = data; // Assigning the data array to the key of the name
      return acc; // Returning the accumulator for the next iteration
    }, {});
    
    console.log(JSON.stringify(grouped));
    return grouped; 

    } catch (error) {
        console.error('Error reading datapoints:', error);
        throw new Error(`Failed to read datapoints ${error}.`);
    }
}

export async function updateDp (dpId: string, name: string, value: string, date: string) {
  try{
    const data = await sql<Datapoints>`
    UPDATE datapoints
    SET value = ${value}, name = ${name}, date=${date}
    WHERE id = ${dpId}
    RETURNING *
    `;
    return data.rows[0];
  }
  catch (e) {
    console.error(`Error modifying dp: ${e}`);
    throw new Error(`Error modifying dp: ${e}`);
  }
}

export async function deleteDp(dpId: string) {
  try {
    const data = await sql<Datapoints>`
      DELETE FROM datapoints
      WHERE id = ${dpId}
      RETURNING *
    `;
    return data.rows[0]; // return the deleted dp
  } catch (error) {
      console.error(`Error deleting dp with id "${dpId}":`, error);
      throw new Error(`Failed to delete dp "${dpId}".`);
  }
}