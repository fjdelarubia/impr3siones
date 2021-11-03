import { Order, OrderStatus } from '@impr3siones/models';
import { completeOrder } from '../orders';

it('should complete an order', () => {
  const order: Order = {
    id: 'some-id',
    status: OrderStatus.Ready
  };

  completeOrder(order);

  expect(order.status).toBe(OrderStatus.Completed);
});
