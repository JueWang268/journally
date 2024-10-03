// not working as of Oct 1
import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, journals, entries, datapoints } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedEntries() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS entries (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      journal_id UUID NOT NULL,
      title VARCHAR(255) NOT NULL,
      content VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  const insertedEntries = await Promise.all(
    entries.map(
      (entry) => client.sql`
        INSERT INTO entries (id, journal_id, title, content, date)
        VALUES (${entry.id}, ${entry.journal_id}, ${entry.title}, ${entry.content}, ${entry.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedEntries;
}

async function seedJournals() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS journals (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL
    );
  `;

  const insertedJournals = await Promise.all(
    journals.map(
      (j) => client.sql`
        INSERT INTO journals (id, title)
        VALUES (${j.id}, ${j.title})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedJournals;
}

async function seedDatapoints() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS datapoints (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      date DATE NOT NULL,
      category VARCHAR(255) NOT NULL,
      value INT NOT NULL,
    );
  `;

  const insertedDatapoints = await Promise.all(
    datapoints.map(
      (datapoint) => client.sql`
        INSERT INTO datapoints (id, date, category, value)
        VALUES (${datapoint.id}, ${datapoint.date}, ${datapoint.category}, ${datapoint.value},)
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedDatapoints;
}

export async function GET() {
    // return Response.json({
    //   message:
    //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
    // });
    try {
      await client.sql`BEGIN`;
      await seedUsers();
      await seedEntries();
      await seedJournals();
      await seedDatapoints();
      await client.sql`COMMIT`;
      console.log("data successfully added");
      
      return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      console.log(error);
      
      return Response.json({error}, { status: 500 });
    }
  }
  