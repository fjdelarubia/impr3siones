import { region } from 'firebase-functions';

export default region('europe-west1')
  .storage.object()
  .onFinalize(async (object): Promise<void> => {
    console.log(
      `Uploaded file to ${object.name} and metadata ${JSON.stringify(
        object.metadata
      )}`
    );
  });
