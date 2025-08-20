import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
  OrderBody,
  OrderDTO,
  OrderResponse,
} from "../../services/order/index.types";
import { createOrder } from "../../services/order";

interface OrderState {
  isLoading: boolean;
  isPending: boolean;
  isSuccess: boolean;
  orders: OrderDTO[];
  error: string | null;
}

interface OrderStore extends OrderState {
  createOrder: (order: OrderBody) => Promise<OrderResponse | null>;
  resetError: () => void;
}

const initialState: OrderState = {
  isLoading: false,
  isPending: false,
  isSuccess: false,
  orders: [],
  error: null,
};

export const useOrderStore = create(
  immer<OrderStore>((set) => ({
    ...initialState,

    createOrder: async (order) => {
      set((state) => {
        state.isPending = true;
        state.isSuccess = false;
        state.error = null;
      });

      try {
        const response = await createOrder(order);

        if (response) {
          set((state) => {
            state.isPending = false;
            state.isSuccess = true;
          });
        } else {
          set((state) => {
            state.isPending = false;
            state.isSuccess = false;
            state.error = "Failed to create order";
          });
        }

        return response;
      } catch (err: any) {
        set((state) => {
          state.isPending = false;
          state.isSuccess = false;
          state.error = err.message || "Unexpected error";
        });
        return null;
      }
    },

    resetError: () =>
      set((state) => {
        state.error = null;
      }),
  }))
);
