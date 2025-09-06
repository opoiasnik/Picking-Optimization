export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface ProductPosition {
  positionId: string;
  x: number;
  y: number;
  z: number;
  productId: string;
  quantity: number;
}

export interface OrderRequest {
  products: string[];
  startingPosition: Position;
}

export interface PickingOrderItem {
  productId: string;
  positionId: string;
}

export interface OrderResponse {
  pickingOrder: PickingOrderItem[];
  distance: number;
}

export interface WarehouseAPIResponse extends Array<ProductPosition> {}

