import { randomUUID } from "node:crypto";
import "dotenv/config";
import { execSync } from "node:child_process";
import { Client } from "pg";

function generateUniqueDatabaURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provider a DATABASE_URL environment variable");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schemaId);

  return url.toString();
}

async function createDatabase(schemaId: string) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(`CREATE SCHEMA IF NOT EXISTS "${schemaId}"`);
  await client.end();
}

async function dropDatabase(schemaId: string) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await client.end();
}

let schemaId: string;

beforeAll(async () => {
  schemaId = randomUUID();
  const databaseURL = generateUniqueDatabaURL(schemaId);

  process.env.DATABASE_URL = databaseURL;

  await createDatabase(schemaId);

  // Rodar as migrações
  execSync(
    "typeorm-ts-node-commonjs migration:run -d ./src/db/typeORM.migration-config.ts",
  );

  console.log("Database URL for testing:", databaseURL);
});

afterAll(async () => {
  if (schemaId) {
    console.log("Tono if");
    await dropDatabase(schemaId);
  }
  console.log("Cleaning up after tests...");
});
