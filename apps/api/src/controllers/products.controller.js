import { prisma } from '../config/db.js';

export async function listProducts(_req, res) {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return res.json(products);
}

export async function getProduct(req, res) {
  const { id } = req.params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.json(product);
}

export async function createProduct(req, res) {
  const { name, description, imageUrl, price, stock = 0 } = req.body;
  if (!name || !description || price === undefined) {
    return res.status(400).json({ message: 'name, description and price are required' });
  }

  const created = await prisma.product.create({
    data: {
      name,
      description,
      imageUrl: imageUrl || null,
      price,
      stock,
    },
  });

  return res.status(201).json(created);
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, imageUrl, price, stock } = req.body;

  const updated = await prisma.product.update({
    where: { id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(description !== undefined ? { description } : {}),
      ...(imageUrl !== undefined ? { imageUrl } : {}),
      ...(price !== undefined ? { price } : {}),
      ...(stock !== undefined ? { stock } : {}),
    },
  });

  return res.json(updated);
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  await prisma.product.delete({ where: { id } });
  return res.status(204).send();
}
