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
      await upsertCartItem(item);
      set((state) => {
        const exists = state.items.find((x) => x.id === item.id);
        if (exists) {
          return {
            items: state.items.map((x) =>
              x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
            ),
          };
        }
        return { items: [...state.items, item] };
      });
    },

    removeItem: async (id) => {
      await deleteCartItem(id);
      set((state) => {
        const found = state.items.find((item) => item.id === id);
        if (!found) {
          return {};
        }
        if (found.quantity > 1) {
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            ),
          };
        }
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      });
    },

    clearAll: async () => {
      await clearCart();
      set({ items: [] });
    },

    getTotal: () => {
      return get().items.reduce((sum, x) => {
        if (x.quantity >= 20) {
          return sum + x.discountPrice * x.quantity;
        }
        return sum + x.price * x.quantity;
      }, 0);
    },
  };
});
