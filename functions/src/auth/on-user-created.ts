import { region } from 'firebase-functions';

export default region('europe-west1')
  .auth.user()
  .onCreate(async (user) => {
    console.log(
      `We got new user with uid: ${user.uid} with emailVerified ${user.emailVerified}`
    );
  });
