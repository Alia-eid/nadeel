import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import prismaPkg from '@prisma/client';

dotenv.config();

const { PrismaClient } = prismaPkg;
const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME || 'System Admin';

  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required in .env');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      name,
      email,
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log(`Admin ready: ${admin.email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error.message);
    await prisma.$disconnect();
    process.exit(1);
  });
