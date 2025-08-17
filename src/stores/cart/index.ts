import { create } from "zustand";
import {
  getAllCartItems,
  upsertCartItem,
  deleteCartItem,
  clearCart,
} from "../../db/cartDB";
import type { CartItem } from "../../models/cart";
import { getPrice } from "../../hooks/product";

interface CartState {
  items: CartItem[];
  loading: boolean;
}

interface CartStore extends CartState {
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  clearAll: () => Promise<void>;
  getTotal: () => number;
}

const initialState: CartState = {
  items: [],
  loading: true,
};

export const useCartStore = create<CartStore>((set, get) => {
  getAllCartItems().then((data) => {
    set({ items: data, loading: false });
  });

  return {
    ...initialState,

    addItem: async (item: CartItem) => {
      const { items } = get();

      const found = items.find((x) => x.id === item.id);

      const qty = Math.max(0, Number(item.quantity) || 1);

      if (qty === 0) {
        if (found) {
          await deleteCartItem(item.id);
          set({ items: items.filter((x) => x.id !== item.id) });
        }
        return;
      }

      const toSave: CartItem = found
        ? { ...found, quantity: qty }
        : { ...item, quantity: qty };

      await upsertCartItem(toSave);

      set((state) => ({
        items: found
          ? state.items.map((x) => (x.id === item.id ? toSave : x))
          : [...state.items, toSave],
      }));
    },

    removeItem: async (id) => {
      const { items } = get();
      const found = items.find((x) => x.id === id);
      if (!found) return;

      await deleteCartItem(id);
      set({ items: items.filter((x) => x.id !== id) });
    },

    clearAll: async () => {
      await clearCart();
      set({ items: [] });
    },

    getTotal: () => {
      return get().items.reduce((sum, x) => {
        const unitPrice = getPrice(x.quantity);
        return sum + unitPrice * x.quantity;
      }, 0);
    },
  };
});
