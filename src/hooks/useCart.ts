// hooks/useCart.ts
import { useEffect, useState, useCallback } from "react";
import {
  getAllCartItems,
  upsertCartItem,
  deleteCartItem,
  clearCart,
  type CartItem,
} from "../db/cartDB";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCartItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const addItem = useCallback(async (item: CartItem) => {
    await upsertCartItem(item);
    setItems((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) {
        return prev.map((x) => (x.id === item.id ? item : x));
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback(async (id: string) => {
    await deleteCartItem(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const clearAll = useCallback(async () => {
    await clearCart();
    setItems([]);
  }, []);

  const getTotal = useCallback(() => {
    return items.reduce((sum, x) => sum + x.price * x.quantity, 0);
  }, [items]);

  return {
    items,
    loading,
    addItem,
    removeItem,
    clearAll,
    getTotal,
  };
}
