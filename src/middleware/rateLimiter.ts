import { Request, Response, NextFunction } from 'express';

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private requests = new Map<string, RateLimitInfo>();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    
    setInterval(() => this.cleanup(), windowMs);
  }

  middleware = (req: Request, res: Response, next: NextFunction): void => {
    const key = this.getKey(req);
    const now = Date.now();
    const info = this.requests.get(key);

    if (!info || now > info.resetTime) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + this.windowMs
      });
      next();
      return;
    }

    if (info.count >= this.maxRequests) {
      res.status(429).json({
        error: 'Too many requests',
        retryAfter: Math.ceil((info.resetTime - now) / 1000)
      });
      return;
    }

    info.count++;
    next();
  };

  private getKey(req: Request): string {
    return req.ip || 'unknown';
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, info] of this.requests.entries()) {
      if (now > info.resetTime) {
        this.requests.delete(key);
      }
    }
  }
}
