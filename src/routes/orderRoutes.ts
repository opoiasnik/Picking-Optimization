import { Router } from 'express';
import { OrderController } from '../controllers/orderController';
import { validateOrderRequest } from '../middleware/validation';

const router = Router();
const orderController = new OrderController();

router.post('/optimize', validateOrderRequest, orderController.optimizeOrder);

export { router as orderRoutes };


