import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getDatabase, DataSnapshot, ref, get } from 'firebase/database';
import { Order } from '../../../models/dist';

import { firebaseConfig } from './config';
import { firebaseOrdersToAppOrders } from './converters/order';
import { PATH_ORDERS, PATH_VERSION } from './database-paths';

class FirebaseConnector {
  private database;

  constructor(config: FirebaseOptions) {
    const app = initializeApp(config);
    this.database = getDatabase(app);
  }

  public async getDatabaseVersion(): Promise<number> {
    return (await this.fvo(PATH_VERSION)).val();
  }

  public async getOrders(): Promise<Order[]> {
    return firebaseOrdersToAppOrders((await this.fvo(PATH_ORDERS)).val());
  }

  private async fvo(path: string): Promise<DataSnapshot> {
    return get(ref(this.database, path));
  }
}

export default new FirebaseConnector(firebaseConfig);
