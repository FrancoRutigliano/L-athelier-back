// import { PrismaClient } from "@prisma/client";
// import { PrismaLibSQL } from "@prisma/adapter-libsql";
// import { createClient } from "@libsql/client";

// if (!process.env.TURSO_DATABASE_URL) {
//     throw new Error("Missing TURSO_DATABASE_URL");
// }

// const libsql = createClient({
//   url: process.env.TURSO_DATABASE_URL,
//   authToken: process.env.TURSO_AUTH_TOKEN,
// });

// const adapter = new PrismaLibSQL(libsql);
// export const prisma = new PrismaClient({ adapter });