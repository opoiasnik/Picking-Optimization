import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, url, ip } = req;
  
  logger.info(`${method} ${url}`, { 
    ip, 
    userAgent: req.get('User-Agent'),
    contentLength: req.get('content-length')
  });

  const originalSend = res.send;
  
  res.send = function(body: any) {
    const duration = Date.now() - start;
    logger.info(`${method} ${url} - ${res.statusCode}`, {
      duration: `${duration}ms`,
      contentLength: Buffer.byteLength(body, 'utf8')
    });
    
    return originalSend.call(this, body);
  };

  next();
};
