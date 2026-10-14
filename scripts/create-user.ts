import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: npx tsx scripts/create-user.ts <email> <password>");
    console.error("Example: npx tsx scripts/create-user.ts admin@example.com MyStrongPass123");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  console.log(`User saved successfully: ${user.email}`);
  console.log("Password was hashed with bcryptjs before saving.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error("Failed to create/update user:", error);
    await prisma.$disconnect();
    process.exit(1);
  });
