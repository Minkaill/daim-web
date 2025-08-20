export type OrderStatus =
  | "processing"
  | "in_transit"
  | "declined"
  | "completed";

export interface IOrder {
  date: string;
  address: string;
  total_price_cents: number;
  user_id: number;
  status: OrderStatus;
  telegram_id: number;
  id: number;
  phone: string;
  is_paid: boolean;
  user: User;
  items: OrderDTO[];
}

export interface User {
  name: string;
  telegram_id: number;
  phone: any;
  id: number;
  created_at: string;
}

export interface OrderDTO {
  id: number;
  order_id: number;
  unit_price_cents: number;
  product_id: number;
  quantity: number;
  line_total_cents: number;
  product: Product;
}

export interface Product {
  name: string;
  id: number;
  price_cents: number;
}
