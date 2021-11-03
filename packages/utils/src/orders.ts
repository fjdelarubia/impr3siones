import { Order, OrderStatus } from '@impr3siones/models';

export const completeOrder = (order: Order): void => {
  order.status = OrderStatus.Completed;
};
