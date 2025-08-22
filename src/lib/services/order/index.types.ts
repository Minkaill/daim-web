export interface OrderBody {
  telegram_id: number;
  address: string;
  phone: string;
  items: OrderDTO[];
  total_price_cents: number;
}

export interface OrderDTO {
  product_id: number;
  quantity: number;
}

export interface BottleResponse {
  telegram_id: number;
  total_bottles: number;
}

export type OrderResponse = OrderBody & { id: number };
