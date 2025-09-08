import axios from 'axios';
import { ProductPosition, WarehouseAPIResponse } from '../types/warehouse';
import { CacheService } from './cacheService';

export class WarehouseApiService {
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private cache = new CacheService();

  constructor() {
    this.baseUrl = process.env.WAREHOUSE_API_URL!;
    this.apiKey = process.env.WAREHOUSE_API_KEY!;
    
    if (!this.baseUrl) {
      throw new Error('WAREHOUSE_API_URL environment variable is required');
    }
    if (!this.apiKey) {
      throw new Error('WAREHOUSE_API_KEY environment variable is required');
    }
  }

  async getProductPositions(productId: string): Promise<ProductPosition[]> {
    const cacheKey = `positions:${productId}`;
    const cached = this.cache.get<ProductPosition[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response = await axios.get<WarehouseAPIResponse>(
        `${this.baseUrl}/${productId}/positions`,
        {
          headers: {
            'x-api-key': this.apiKey,
          },
          timeout: 10000,
        }
      );

      this.cache.set(cacheKey, response.data, 2 * 60 * 1000); // 2 minutes cache
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch positions for product ${productId}: ${error.message}`);
      }
      throw new Error(`Unexpected error while fetching positions for product ${productId}`);
    }
  }

  async getAllProductPositions(productIds: string[]): Promise<Map<string, ProductPosition[]>> {
    const positionsMap = new Map<string, ProductPosition[]>();
    
    const promises = productIds.map(async (productId) => {
      const positions = await this.getProductPositions(productId);
      positionsMap.set(productId, positions);
    });

    await Promise.all(promises);
    return positionsMap;
  }
}

