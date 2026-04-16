import { prisma } from '../config/db.js';

export async function getMyCart(req, res) {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: req.user.userId },
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  });
  return res.json(cartItems);
}

export async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'productId is required' });
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  if (product.stock <= 0) {
    return res.status(400).json({ message: 'Product is out of stock' });
  }

  const existing = await prisma.cartItem.findFirst({
    where: { userId: req.user.userId, productId },
  });

  const nextQty = existing ? existing.quantity + quantity : quantity;
  if (nextQty > product.stock) {
    return res.status(400).json({
      message: `Only ${product.stock} item(s) available in stock`,
    });
  }

  if (existing) {
    const updated = await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: nextQty },
      include: { product: true },
    });
    return res.json(updated);
  }

  const created = await prisma.cartItem.create({
    data: {
      userId: req.user.userId,
      productId,
      quantity,
    },
    include: { product: true },
  });

  return res.status(201).json(created);
}

export async function removeFromCart(req, res) {
  const { id } = req.params;
  const cartItem = await prisma.cartItem.findFirst({
    where: { id, userId: req.user.userId },
  });

  if (!cartItem) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  await prisma.cartItem.delete({ where: { id } });
  return res.status(204).send();
}

export async function updateCartItemQuantity(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: 'quantity must be at least 1' });
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: { id, userId: req.user.userId },
    include: { product: true },
  });

  if (!cartItem) {
    return res.status(404).json({ message: 'Cart item not found' });
  }

  if (quantity > cartItem.product.stock) {
    return res.status(400).json({
      message: `Only ${cartItem.product.stock} item(s) available in stock`,
    });
  }

  const updated = await prisma.cartItem.update({
    where: { id },
    data: { quantity },
    include: { product: true },
  });

  return res.json(updated);
}
