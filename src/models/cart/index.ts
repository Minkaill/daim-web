import type { Prices } from "../product";

export interface CartItem {
  id: number;
  title: string;
  quantity: number;
  image: string;
  prices: Prices[];
}
