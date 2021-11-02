import { Order } from '@impr3siones/models';

export const completeOrder = (order: Order): void => {
  order.status = 'completed';
};
