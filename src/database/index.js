import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dbService = {
  prisma: prisma,
};
export default dbService;
