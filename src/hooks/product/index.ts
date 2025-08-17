import type { Prices } from "../../models/product";

export const getPrice = (prices: Prices[], amount: number): number => {
  for (const p of prices) {
    if (p.max === null && amount >= p.min) {
      return p.value;
    }
    if (amount >= p.min && amount <= (p.max as number)) {
      return p.value;
    }
  }
  return 0;
};
