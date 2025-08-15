import { create } from "zustand";
import {
  getAllCartItems,
  upsertCartItem,
  deleteCartItem,
  clearCart,
} from "../../db/cartDB";
import type { CartItem } from "../../models/cart";

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

const TIERS = [0, 20, 100, 500, 1000, 2000] as const;

const nextTier = (qty: number) => {
  for (let i = 0; i < TIERS.length; i++) {
    if (qty < TIERS[i]) return TIERS[i];
  }
  return TIERS[TIERS.length - 1];
};

const prevTier = (qty: number) => {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (qty > TIERS[i]) return TIERS[i];
  }
  return TIERS[0];
};

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

    addItem: async (item) => {
      const { items } = get();
      const exists = items.find((x) => x.id === item.id);

      if (exists) {
        const newQty = nextTier(exists.quantity);
        if (newQty === exists.quantity) return;

        const updated = { ...exists, quantity: newQty };
        await upsertCartItem(updated);

        set({
          items: items.map((x) => (x.id === item.id ? updated : x)),
        });
        return;
      }

      const startQty = 20;
      const toSave = { ...item, quantity: startQty };
      await upsertCartItem(toSave);
      set({ items: [...items, toSave] });
    },

    removeItem: async (id) => {
      const { items } = get();
      const found = items.find((x) => x.id === id);
      if (!found) return;

      const newQty = prevTier(found.quantity);

      if (newQty === 0) {
        await deleteCartItem(id);
        set({ items: items.filter((x) => x.id !== id) });
        return;
      }

      const updated = { ...found, quantity: newQty };
      await upsertCartItem(updated);
      set({
        items: items.map((x) => (x.id === id ? updated : x)),
      });
    },

    clearAll: async () => {
      await clearCart();
      set({ items: [] });
    },

    getTotal: () => {
      return get().items.reduce((sum, x) => {
        return sum + x.price * x.quantity;
      }, 0);
    },
  };
});
