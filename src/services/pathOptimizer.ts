import { Position, ProductPosition, PickingOrderItem } from '../types/warehouse';

export class PathOptimizerService {
  calculateDistance(pos1: Position, pos2: Position): number {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    const dz = pos1.z - pos2.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  selectOptimalPosition(positions: ProductPosition[]): ProductPosition {
    if (positions.length === 0) {
      throw new Error('No positions available for product');
    }
    
    if (positions.length === 1) {
      return positions[0];
    }

    return positions.reduce((best, current) => {
      if (current.quantity > best.quantity) {
        return current;
      }
      if (current.quantity === best.quantity) {
        return current.z < best.z ? current : best;
      }
      return best;
    });
  }

  optimizePickingOrder(
    productPositionsMap: Map<string, ProductPosition[]>,
    startingPosition: Position
  ): { pickingOrder: PickingOrderItem[]; totalDistance: number } {
    const productIds = Array.from(productPositionsMap.keys());
    
    if (productIds.length === 0) {
      return { pickingOrder: [], totalDistance: 0 };
    }

    const selectedPositions: ProductPosition[] = [];
    for (const productId of productIds) {
      const positions = productPositionsMap.get(productId)!;
      selectedPositions.push(this.selectOptimalPosition(positions));
    }

    if (selectedPositions.length === 1) {
      const position = selectedPositions[0];
      return {
        pickingOrder: [{ productId: position.productId, positionId: position.positionId }],
        totalDistance: this.calculateDistance(startingPosition, position)
      };
    }

    const { path, distance } = this.solveTSP(selectedPositions, startingPosition);
    
    const pickingOrder: PickingOrderItem[] = path.map(position => ({
      productId: position.productId,
      positionId: position.positionId
    }));

    return { pickingOrder, totalDistance: Math.round(distance) };
  }

  private solveTSP(positions: ProductPosition[], start: Position): { path: ProductPosition[]; distance: number } {
    const n = positions.length;
    
    if (n <= 1) {
      return {
        path: positions,
        distance: positions.length > 0 ? this.calculateDistance(start, positions[0]) : 0
      };
    }

    let bestPath: ProductPosition[] = [];
    let bestDistance = Infinity;

    const permutations = this.generatePermutations(positions);
    
    for (const perm of permutations) {
      const distance = this.calculatePathDistance(start, perm);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestPath = [...perm];
      }
    }

    return { path: bestPath, distance: bestDistance };
  }

  private generatePermutations<T>(arr: T[]): T[][] {
    if (arr.length <= 1) return [arr];
    
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const current = arr[i];
      const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
      const permutations = this.generatePermutations(remaining);
      
      for (const perm of permutations) {
        result.push([current, ...perm]);
      }
    }
    
    return result;
  }

  private calculatePathDistance(start: Position, path: ProductPosition[]): number {
    if (path.length === 0) return 0;
    
    let totalDistance = this.calculateDistance(start, path[0]);
    
    for (let i = 1; i < path.length; i++) {
      totalDistance += this.calculateDistance(path[i - 1], path[i]);
    }
    
    return totalDistance;
  }
}

