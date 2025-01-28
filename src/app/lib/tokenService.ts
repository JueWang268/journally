import { sql } from "@vercel/postgres";
import { Tokens } from "./definitions";

export async function upsertToken(user_id: string, token: string) {
  try {
    const res = await sql`
      SELECT * FROM tokens WHERE user_id = ${user_id}
    `;

    const currentTime = new Date().toISOString();

    if (res.rows.length > 0) {
      await sql`
        UPDATE tokens
        SET token = ${token}, timestamp = ${currentTime}
        WHERE user_id = ${user_id}
      `;
    } else {
      await sql`
        INSERT INTO tokens (user_id, token, timestamp)
        VALUES (${user_id}, ${token}, ${currentTime})
      `;
    }

    return { success: true, message: "Token upserted successfully" };
  } catch (error) {
    console.error("Error upserting token:", error);
    return { success: false, message: "Failed to upsert token" };
  }
}
