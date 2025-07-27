import { create } from "zustand";
import {
  getAllCartItems,
  upsertCartItem,
  deleteCartItem,
  clearCart,
  type CartItem,
} from "../../db/cartDB";

interface CartState {
  items: CartItem[];
  loading: boolean;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  clearAll: () => Promise<void>;
  getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => {
  getAllCartItems().then((data) => {
    set({ items: data, loading: false });
  });

  return {
    items: [],
    loading: true,

    addItem: async (item) => {
      await upsertCartItem(item);
      set((state) => {
        const exists = state.items.find((x) => x.id === item.id);
        if (exists) {
          return {
            items: state.items.map((x) => (x.id === item.id ? item : x)),
          };
        }
        return { items: [...state.items, item] };
      });
    },

    removeItem: async (id) => {
      await deleteCartItem(id);
      set((state) => ({
        items: state.items.filter((x) => x.id !== id),
      }));
    },

    clearAll: async () => {
      await clearCart();
      set({ items: [] });
    },

    getTotal: () => {
      return get().items.reduce((sum, x) => sum + x.price * x.quantity, 0);
    },
  };
});
