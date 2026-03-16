import { PrismaClient } from "@prisma/client/extension"


// Declară tipul pentru globalThis cu prisma
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Exportă o singură instanță PrismaClient
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

// În development, păstrează instanța între reîncărcări
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma