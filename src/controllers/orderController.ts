import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { OrderRequest } from '../types/warehouse';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  optimizeOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderRequest: OrderRequest = req.body;
      const result = await this.orderService.optimizeOrder(orderRequest);
      
      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal server error';
      
      if (errorMessage.includes('No positions found for product')) {
        res.status(404).json({ error: errorMessage });
        return;
      }
      
      if (errorMessage.includes('Failed to fetch positions')) {
        res.status(502).json({ error: 'External API error: ' + errorMessage });
        return;
      }
      
      res.status(500).json({ error: errorMessage });
    }
  };
}
