import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.string().default("production"),
  DATABASE_URL: z.string(),
  DATABASE_CLIENT: z.enum(["pg"]),
  MONGOSE_URL: z.string(),
  SUPERHERO_DATABASE_URL: z.string(),
  PORT: z.coerce.number().optional().default(3333),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;
