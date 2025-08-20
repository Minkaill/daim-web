import type { IOrder } from "../../../models/order";
import { http } from "../../http";
import type { BottleResponse, OrderBody, OrderResponse } from "./index.types";

export const createOrder = async (order: OrderBody): Promise<OrderResponse> => {
  const response = await http<OrderResponse>("orders", {
    method: "POST",
    body: JSON.stringify(order),
    parseJson: true,
  });
  return response;
};

export const getMyOrders = async (telegram_id: number): Promise<IOrder[]> => {
  const response = await http<IOrder[]>(`orders/users/${telegram_id}/`, {
    method: "GET",
    parseJson: true,
  });
  return response;
};

export const getBottles = async (
  telegram_id: number
): Promise<BottleResponse> => {
  const response = await http<BottleResponse>(
    `orders/users/count/${telegram_id}`,
    {
      parseJson: true,
    }
  );
  return response;
};
