import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.project.createMany({
    data: [
      {
        id: "project-1",
        name: "Admin Dashboard",
        client: "Papertrail Studio",
        description: "",
        status: "In Progress",
        value: 1900,
        progress: 60,
        dueDate: "2027-01-19",
        icon: "chart",
        color: "Green",
      },
      {
        id: "project-2",
        name: "Portfolio",
        client: "Maya Chen",
        description: "",
        status: "Completed",
        value: 500,
        progress: 100,
        dueDate: "2024-08-16",
        icon: "portfolio",
        color: "purple",
      },
      {
        id: "project-3",
        name: "Library Management",
        client: "Infotech Ltd",
        description: "",
        status: "In Progress",
        value: 1800,
        progress: 40,
        dueDate: "2026-11-19",
        icon: "fork",
        color: "purple",
      },
      {
        id: "project-4",
        name: "Ticket Booker",
        client: "DSB",
        description: "",
        status: "In Progress",
        value: 3500,
        progress: 10,
        dueDate: "2027-05-05",
        icon: "fork",
        color: "Sky blue",
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
