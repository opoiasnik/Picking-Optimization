import axios from 'axios';
import { ProductPosition, WarehouseAPIResponse } from '../types/warehouse';
import { CacheService } from './cacheService';

export class WarehouseApiService {
  private readonly baseUrl = 'https://dev.aux.boxpi.com/case-study/products';
  private readonly apiKey = 'MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z';
  private cache = new CacheService();

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

