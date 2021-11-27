import { initializeApp, FirebaseOptions } from 'firebase/app';
import {
  getDatabase,
  DataSnapshot,
  ref,
  get,
  connectDatabaseEmulator
} from 'firebase/database';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  User,
  signOut,
  connectAuthEmulator
} from 'firebase/auth';
import { Order } from '../../../models/dist';

import { firebaseConfig, shouldConnectToEmulator } from './config';
import { firebaseOrdersToAppOrders } from './converters/order';
import { PATH_ORDERS, PATH_VERSION } from './database-paths';
import { onAuthDataChange } from '../listeners/auth';
import { UserData } from '../models/user';
import { firebaseUserDataToUserData } from './converters/user';

class FirebaseConnector {
  private database;
  private auth;
  private user: User | null;

  private authDataListeners: onAuthDataChange[] = [];

  constructor(config: FirebaseOptions) {
    const app = initializeApp(config);
    this.database = getDatabase(app);
    this.auth = getAuth(app);

    if (shouldConnectToEmulator()) {
      connectDatabaseEmulator(this.database, 'localhost', 9000);
      connectAuthEmulator(this.auth, 'http://localhost:9099');
    }

    this.user = null;

    this.auth.onAuthStateChanged((user) => {
      this.user = user;
      this.notifyAuthDataListeners(
        firebaseUserDataToUserData(user ?? undefined)
      );
    });
  }

  public async getDatabaseVersion(): Promise<number> {
    return (await this.fvo(PATH_VERSION)).val();
  }

  public async getOrders(): Promise<Order[]> {
    return firebaseOrdersToAppOrders((await this.fvo(PATH_ORDERS)).val());
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');

    await signInWithRedirect(this.auth, provider);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  private async fvo(path: string): Promise<DataSnapshot> {
    return get(ref(this.database, path));
  }

  private notifyAuthDataListeners(userData?: UserData): void {
    this.authDataListeners.forEach((listener) => listener(userData));
  }

  public onAuthDataReceived(listener: onAuthDataChange): () => void {
    this.authDataListeners.push(listener);
    return (): void => {
      this.authDataListeners.splice(
        this.authDataListeners.indexOf(listener),
        1
      );
    };
  }
}

export default new FirebaseConnector(firebaseConfig);
