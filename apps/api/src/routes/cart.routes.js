import { Router } from 'express';
import {
  addToCart,
  getMyCart,
  removeFromCart,
  updateCartItemQuantity,
} from '../controllers/cart.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', getMyCart);
router.post('/', addToCart);
router.put('/:id', updateCartItemQuantity);
router.delete('/:id', removeFromCart);

export default router;
