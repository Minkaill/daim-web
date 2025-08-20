import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
  OrderBody,
  OrderResponse,
} from "../../services/order/index.types";
import {
  createOrder,
  getMyOrders as getMyOrdersService,
} from "../../services/order";
import type { IOrder } from "../../../models/order";

interface OrderState {
  isLoading: boolean;
  isPending: boolean;
  isSuccess: boolean;
  orders: IOrder[];
  error: string | null;
}

interface OrderStore extends OrderState {
  createOrder: (order: OrderBody) => Promise<OrderResponse | null>;
  getMyOrders: (telegram_id: number) => Promise<IOrder[] | null>;
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
  immer<OrderStore>((set, get) => ({
    ...initialState,

    createOrder: async (order) => {
      set((s) => {
        s.isPending = true;
        s.isSuccess = false;
        s.error = null;
      });

      try {
        const response = await createOrder(order);
        set((s) => {
          s.isPending = false;
          s.isSuccess = true;
        });
        await get().getMyOrders(order.telegram_id);
        return response;
      } catch (err: any) {
        set((s) => {
          s.isPending = false;
          s.isSuccess = false;
          s.error = err?.message || "Unexpected error";
        });
        return null;
      }
    },

    getMyOrders: async (telegram_id) => {
      set((state) => {
        state.isLoading = true;
        state.error = null;
      });
      try {
        const response = await getMyOrdersService(telegram_id);
        set((state) => {
          state.orders = response;
          state.isLoading = false;
        });
        return response;
      } catch (err: any) {
        set((state) => {
          state.isLoading = false;
          state.error = err?.message || "Failed to fetch orders";
        });
        return null;
      }
    },

    resetError: () => {
      set((state) => {
        state.error = null;
      });
    },
  }))
);
