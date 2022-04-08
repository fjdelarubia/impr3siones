import { initializeApp } from 'firebase/app';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

import { firebaseConfig, shouldConnectToEmulator } from './config';
import { OrdersConnector } from './connectors/database/orders';
import { AuthConnector } from './connectors/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { StorageConnector } from './connectors/storage';

const app = initializeApp(firebaseConfig);
const firebaseDatabase = getDatabase(app);
const firebaseAuth = getAuth(app);
const firebaseStorage = getStorage(app);

if (shouldConnectToEmulator()) {
  connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
  connectDatabaseEmulator(firebaseDatabase, 'localhost', 9000);
  connectStorageEmulator(firebaseStorage, 'localhost', 9199);
}

export const auth = new AuthConnector(firebaseAuth);
export const orders = new OrdersConnector(firebaseDatabase);
export const storage = new StorageConnector(firebaseStorage, auth);

export type { AuthConnector } from './connectors/auth';
export type { OrdersConnector } from './connectors/database/orders';
export type { StorageConnector } from './connectors/storage';
