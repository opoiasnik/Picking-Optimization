import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { orderRoutes } from './routes/orderRoutes';
import { requestLogger } from './middleware/requestLogger';
import { RateLimiter } from './middleware/rateLimiter';

const app = express();
const rateLimiter = new RateLimiter(50, 15 * 60 * 1000); // 50 requests per 15 minutes

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(requestLogger);
app.use(rateLimiter.middleware);

app.use('/api/orders', orderRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

export { app };
