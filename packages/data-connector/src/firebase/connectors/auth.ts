import {
  GoogleAuthProvider,
  Auth,
  signInWithRedirect,
  User,
  signOut
} from 'firebase/auth';

import { onAuthDataChange } from '../../listeners/auth';
import { UserData } from '../../models/user';
import { firebaseUserDataToUserData } from '../converters/user';

export class AuthConnector {
  private user: User | null;

  private authDataListeners: onAuthDataChange[] = [];

  constructor(private auth: Auth) {
    this.user = null;

    this.auth.onAuthStateChanged((user) => {
      this.user = user;
      this.notifyAuthDataListeners(
        firebaseUserDataToUserData(user ?? undefined)
      );
    });
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
