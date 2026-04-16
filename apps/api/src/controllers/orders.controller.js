import { prisma } from '../config/db.js';

export async function listMyOrders(req, res) {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return res.json(orders);
}

export async function checkout(req, res) {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: req.user.userId },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  for (const item of cartItems) {
    if (item.quantity > item.product.stock) {
      return res.status(400).json({
        message: `Not enough stock for ${item.product.name}. Only ${item.product.stock} left.`,
      });
    }
  }

  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.product.price) * item.quantity;
  }, 0);

  try {
    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId: req.user.userId,
          totalPrice: total,
        },
      });

      await tx.orderItem.createMany({
        data: cartItems.map((item) => ({
          orderId: createdOrder.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      });

      for (const item of cartItems) {
        const result = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });
        if (result.count !== 1) {
          throw new Error('INSUFFICIENT_STOCK');
        }
      }

      await tx.cartItem.deleteMany({ where: { userId: req.user.userId } });
      return createdOrder;
    });

    return res.status(201).json(order);
  } catch (error) {
    if (error.message === 'INSUFFICIENT_STOCK') {
      return res.status(409).json({
        message: 'Stock changed — refresh the cart and try again',
      });
    }
    throw error;
  }
}
