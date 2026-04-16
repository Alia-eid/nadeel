import { Router } from 'express';
import { checkout, listMyOrders } from '../controllers/orders.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAuth);
router.get('/', listMyOrders);
router.post('/checkout', checkout);

export default router;
