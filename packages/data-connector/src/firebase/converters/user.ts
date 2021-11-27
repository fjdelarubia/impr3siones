import { User } from 'firebase/auth';
import { UserData } from '../../models/user';

export const firebaseUserDataToUserData = (
  user?: User
): UserData | undefined => {
  if (!user) {
    return;
  }

  return {
    emailVerified: user.emailVerified,
    displayName: user.displayName || undefined,
    photoUrl: user.photoURL || undefined
  };
};
