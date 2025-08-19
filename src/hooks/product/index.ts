import type { Prices } from "../../models/product";

const prices: Prices[] = [
  { min: 20, max: 99, value: 250 },
  { min: 100, max: 499, value: 240 },
  { min: 500, max: 999, value: 220 },
  { min: 1000, max: 1999, value: 200 },
  { min: 2000, max: null, value: 180 },
];

export const getPrice = (amount: number): number => {
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

export const formatPhone = (value: string) => {
  let digits = value.replace(/\D/g, "");

  if (!digits.startsWith("7")) {
    digits = "7" + digits;
  }

  const num = digits.slice(1);

  let result = "+7 ";
  if (num.length > 0) result += "(" + num.slice(0, 3);
  if (num.length >= 4) result += ") " + num.slice(3, 6);
  if (num.length >= 7) result += "-" + num.slice(6, 8);
  if (num.length >= 9) result += "-" + num.slice(8, 10);

  return result;
};
