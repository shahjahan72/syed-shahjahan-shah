import { PrismaClient } from '@prisma/client';

// Create a single PrismaClient instance and cache it to avoid exhausting
// database connections in serverless / hot-reload environments.
const globalForPrisma = globalThis;

if (!globalForPrisma.__prisma) {
  globalForPrisma.__prisma = new PrismaClient();
}

export default globalForPrisma.__prisma;
