import { ProductPosition } from '../types/warehouse';

export class MockWarehouseApiService {
  private mockData: Record<string, ProductPosition[]> = {
    'product-1': [
      {
        positionId: 'position-31',
        x: 3,
        y: 1,
        z: 0,
        productId: 'product-1',
        quantity: 13
      },
      {
        positionId: 'position-449',
        x: 87,
        y: 7,
        z: 100,
        productId: 'product-1',
        quantity: 4
      },
      {
        positionId: 'position-512',
        x: 42,
        y: 15,
        z: 1,
        productId: 'product-1',
        quantity: 8
      }
    ],
    'product-2': [
      {
        positionId: 'position-123',
        x: 15,
        y: 20,
        z: 1,
        productId: 'product-2',
        quantity: 8
      },
      {
        positionId: 'position-234',
        x: 45,
        y: 30,
        z: 2,
        productId: 'product-2',
        quantity: 12
      },
      {
        positionId: 'position-345',
        x: 72,
        y: 8,
        z: 0,
        productId: 'product-2',
        quantity: 15
      }
    ],
    'product-3': [
      {
        positionId: 'position-145',
        x: 25,
        y: 15,
        z: 0,
        productId: 'product-3',
        quantity: 6
      },
      {
        positionId: 'position-246',
        x: 55,
        y: 35,
        z: 1,
        productId: 'product-3',
        quantity: 10
      },
      {
        positionId: 'position-347',
        x: 12,
        y: 45,
        z: 2,
        productId: 'product-3',
        quantity: 3
      }
    ],
    'product-4': [
      {
        positionId: 'position-456',
        x: 60,
        y: 40,
        z: 1,
        productId: 'product-4',
        quantity: 20
      },
      {
        positionId: 'position-567',
        x: 30,
        y: 50,
        z: 0,
        productId: 'product-4',
        quantity: 7
      }
    ],
    'product-5': [
      {
        positionId: 'position-678',
        x: 80,
        y: 25,
        z: 2,
        productId: 'product-5',
        quantity: 14
      },
      {
        positionId: 'position-789',
        x: 18,
        y: 32,
        z: 0,
        productId: 'product-5',
        quantity: 9
      },
      {
        positionId: 'position-890',
        x: 65,
        y: 12,
        z: 1,
        productId: 'product-5',
        quantity: 11
      }
    ],
    'product-6': [
      {
        positionId: 'position-901',
        x: 38,
        y: 28,
        z: 1,
        productId: 'product-6',
        quantity: 5
      },
      {
        positionId: 'position-012',
        x: 75,
        y: 45,
        z: 0,
        productId: 'product-6',
        quantity: 18
      }
    ],
    'product-7': [
      {
        positionId: 'position-213',
        x: 22,
        y: 38,
        z: 2,
        productId: 'product-7',
        quantity: 12
      },
      {
        positionId: 'position-324',
        x: 58,
        y: 18,
        z: 1,
        productId: 'product-7',
        quantity: 6
      },
      {
        positionId: 'position-435',
        x: 90,
        y: 55,
        z: 0,
        productId: 'product-7',
        quantity: 22
      }
    ],
    'product-8': [
      {
        positionId: 'position-546',
        x: 48,
        y: 42,
        z: 1,
        productId: 'product-8',
        quantity: 16
      },
      {
        positionId: 'position-657',
        x: 8,
        y: 65,
        z: 2,
        productId: 'product-8',
        quantity: 4
      }
    ],
    'product-9': [
      {
        positionId: 'position-768',
        x: 85,
        y: 35,
        z: 0,
        productId: 'product-9',
        quantity: 19
      },
      {
        positionId: 'position-879',
        x: 35,
        y: 55,
        z: 1,
        productId: 'product-9',
        quantity: 8
      },
      {
        positionId: 'position-980',
        x: 62,
        y: 22,
        z: 2,
        productId: 'product-9',
        quantity: 13
      }
    ],
    'product-10': [
      {
        positionId: 'position-091',
        x: 28,
        y: 48,
        z: 0,
        productId: 'product-10',
        quantity: 25
      },
      {
        positionId: 'position-102',
        x: 78,
        y: 15,
        z: 1,
        productId: 'product-10',
        quantity: 7
      }
    ],
    'product-11': [
      {
        positionId: 'position-203',
        x: 52,
        y: 38,
        z: 2,
        productId: 'product-11',
        quantity: 11
      },
      {
        positionId: 'position-304',
        x: 15,
        y: 58,
        z: 1,
        productId: 'product-11',
        quantity: 14
      },
      {
        positionId: 'position-405',
        x: 95,
        y: 28,
        z: 0,
        productId: 'product-11',
        quantity: 9
      }
    ],
    'product-12': [
      {
        positionId: 'position-506',
        x: 68,
        y: 52,
        z: 1,
        productId: 'product-12',
        quantity: 17
      },
      {
        positionId: 'position-607',
        x: 32,
        y: 12,
        z: 0,
        productId: 'product-12',
        quantity: 6
      }
    ],
    'product-13': [
      {
        positionId: 'position-708',
        x: 45,
        y: 65,
        z: 2,
        productId: 'product-13',
        quantity: 20
      },
      {
        positionId: 'position-809',
        x: 88,
        y: 42,
        z: 0,
        productId: 'product-13',
        quantity: 12
      }
    ],
    'product-14': [
      {
        positionId: 'position-910',
        x: 12,
        y: 25,
        z: 1,
        productId: 'product-14',
        quantity: 8
      },
      {
        positionId: 'position-021',
        x: 75,
        y: 58,
        z: 2,
        productId: 'product-14',
        quantity: 15
      },
      {
        positionId: 'position-132',
        x: 55,
        y: 85,
        z: 0,
        productId: 'product-14',
        quantity: 23
      }
    ],
    'product-15': [
      {
        positionId: 'position-243',
        x: 38,
        y: 72,
        z: 1,
        productId: 'product-15',
        quantity: 10
      },
      {
        positionId: 'position-354',
        x: 82,
        y: 18,
        z: 0,
        productId: 'product-15',
        quantity: 18
      }
    ]
  };

  async getProductPositions(productId: string): Promise<ProductPosition[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const positions = this.mockData[productId];
    if (!positions) {
      throw new Error(`No positions found for product ${productId}`);
    }
    
    return positions;
  }

  async getAllProductPositions(productIds: string[]): Promise<Map<string, ProductPosition[]>> {
    const positionsMap = new Map<string, ProductPosition[]>();
    
    for (const productId of productIds) {
      const positions = await this.getProductPositions(productId);
      positionsMap.set(productId, positions);
    }

    return positionsMap;
  }
}


