import { Database } from 'firebase/database';

import { Order } from '../../../../../models/dist';

import { firebaseOrdersToAppOrders } from '../../converters/order';
import DatabaseConnector from './database';
import { PATH_ORDERS } from './database-paths';

export class OrdersConnector extends DatabaseConnector {
  constructor(database: Database) {
    super(database);
  }

  public async getOrders(): Promise<Order[]> {
    return firebaseOrdersToAppOrders((await this.fvo(PATH_ORDERS)).val());
  }
}
