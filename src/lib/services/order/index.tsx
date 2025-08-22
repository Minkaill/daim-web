import type { IOrder } from "../../../models/order";
import { api } from "../../http";
import type { BottleResponse, OrderBody, OrderResponse } from "./index.types";

export const createOrder = async (order: OrderBody): Promise<OrderResponse> => {
  const { data } = await api.post<OrderResponse>("/orders/", order);
  return data;
};

export const getMyOrders = async ({
  telegram_id,
  title,
  status,
}: {
  telegram_id: number;
  title?: string;
  status?: string;
}): Promise<IOrder[]> => {
  const params: Record<string, string | number> = {};

  if (title) params.title = title;
  if (status) params.status = status;

  const { data } = await api.get<IOrder[]>(`/orders/users/${telegram_id}`, {
    params,
  });

  return data;
};
export const getBottles = async (
  telegram_id: number
): Promise<BottleResponse> => {
  const { data } = await api.get<BottleResponse>(
    `/orders/users/bottles/${telegram_id}`
  );
  return data;
};
