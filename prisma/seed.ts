/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export const boards = [
  { name: "Technology" },
  { name: "Politics" },
  { name: "Sports" },
  { name: "Gaming" },
  { name: "Science" },
  { name: "Entertainment" },
  { name: "Business" },
  { name: "Health" },
  { name: "Education" },
  { name: "Travel" },
];

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await db.board.createMany({
    data: boards,
  });
}

void main();
