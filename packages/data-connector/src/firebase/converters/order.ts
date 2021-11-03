import {
  FirebaseOrderStatus,
  FirebaseOrder,
  FirebaseOrders
} from '../models/order';
import { OrderStatus, Order } from '@impr3siones/models';
import { firebaseMapToPairArray } from './utils';

const firebaseOrderStatusToAppOrderStatus = (
  firebaseOrderStatus: FirebaseOrderStatus
): OrderStatus => {
  switch (firebaseOrderStatus) {
    case FirebaseOrderStatus.Completed:
      return OrderStatus.Completed;
    case FirebaseOrderStatus.Pending:
      return OrderStatus.Pending;
    case FirebaseOrderStatus.Processing:
      return OrderStatus.Processing;
    case FirebaseOrderStatus.Ready:
      return OrderStatus.Ready;
  }
};

const firebaseOrderToAppOrder = (id: string, { s }: FirebaseOrder): Order => ({
  id,
  status: firebaseOrderStatusToAppOrderStatus(s)
});

export const firebaseOrdersToAppOrders = (
  firebaseOrders: FirebaseOrders
): Order[] =>
  firebaseMapToPairArray(firebaseOrders).map(([orderId, order]) =>
    firebaseOrderToAppOrder(orderId, order)
  );
