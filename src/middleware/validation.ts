import { Request, Response, NextFunction } from 'express';
import { OrderRequest } from '../types/warehouse';

export const validateOrderRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { products, startingPosition } = req.body as OrderRequest;

  if (!Array.isArray(products)) {
    res.status(400).json({ 
      error: 'Invalid request: products must be an array' 
    });
    return;
  }

  if (products.some(product => typeof product !== 'string' || product.trim() === '')) {
    res.status(400).json({ 
      error: 'Invalid request: all products must be non-empty strings' 
    });
    return;
  }

  if (!startingPosition || typeof startingPosition !== 'object') {
    res.status(400).json({ 
      error: 'Invalid request: startingPosition is required' 
    });
    return;
  }

  const { x, y, z } = startingPosition;
  if (typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
    res.status(400).json({ 
      error: 'Invalid request: startingPosition coordinates (x, y, z) must be numbers' 
    });
    return;
  }

  if (!isFinite(x) || !isFinite(y) || !isFinite(z)) {
    res.status(400).json({ 
      error: 'Invalid request: startingPosition coordinates must be finite numbers' 
    });
    return;
  }

  next();
};

