export interface IProduct {
  id: number;
  title: string;
  description: string;
  prices: Prices[];
  volume: string;
  image: string;
}

export interface Prices {
  min: number;
  max: number | null;
  value: number;
}
