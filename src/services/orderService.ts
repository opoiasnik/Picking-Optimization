import { WarehouseApiService } from './warehouseApi';
import { PathOptimizerService } from './pathOptimizer';
import { OrderRequest, OrderResponse } from '../types/warehouse';

export class OrderService {
  private warehouseApi: WarehouseApiService;
  private pathOptimizer: PathOptimizerService;

  constructor() {
    this.warehouseApi = new WarehouseApiService();
    this.pathOptimizer = new PathOptimizerService();
  }

  async optimizeOrder(orderRequest: OrderRequest): Promise<OrderResponse> {
    const { products, startingPosition } = orderRequest;

    if (products.length === 0) {
      return { pickingOrder: [], distance: 0 };
    }

    try {
      const productPositionsMap = await this.warehouseApi.getAllProductPositions(products);

      for (const productId of products) {
        const positions = productPositionsMap.get(productId);
        if (!positions || positions.length === 0) {
          throw new Error(`No positions found for product: ${productId}`);
        }
      }

      const { pickingOrder, totalDistance } = this.pathOptimizer.optimizePickingOrder(
        productPositionsMap,
        startingPosition
      );

      return {
        pickingOrder,
        distance: totalDistance
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Order optimization failed: ${error.message}`);
      }
      throw new Error('Unknown error occurred during order optimization');
    }
  }
}
