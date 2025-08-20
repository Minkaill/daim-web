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

export const getBottles = async (user_id: number): Promise<BottleResponse> => {
  const response = await http<BottleResponse>(`orders/users/${user_id}`, {
    parseJson: true,
  });

  return response;
};
