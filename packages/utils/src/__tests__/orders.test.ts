import { Order } from '@impr3siones/models';
import { completeOrder } from '../orders';

it('should complete an order', () => {
  const order: Order = {
    id: 'some-id',
    status: 'pending'
  };

  completeOrder(order);

  expect(order.status).toBe('completed');
});
