import dotenv from 'dotenv';
import prismaPkg from '@prisma/client';

dotenv.config();

const { PrismaClient } = prismaPkg;
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'Wireless Headphones',
      description: 'Over-ear Bluetooth headphones with noise cancellation',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      price: '89.99',
      stock: 25,
    },
    {
      name: 'Smart Watch',
      description: 'Fitness and notification tracking smart watch',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      price: '129.99',
      stock: 15,
    },
    {
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with RGB lighting',
      imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7',
      price: '39.99',
      stock: 40,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { name: product.name },
      update: product,
      create: product,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
