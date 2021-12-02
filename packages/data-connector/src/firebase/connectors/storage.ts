import {
  FirebaseStorage,
  ref,
  deleteObject,
  StorageReference,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { UploadStatusUpdatedListener } from '../../listeners/storage';
import { AuthConnector } from './auth';

export class StorageConnector {
  private uid: string | null = null;

  constructor(private storage: FirebaseStorage, authConnector: AuthConnector) {
    authConnector.onAuthDataReceived((user) => {
      this.uid = user?.uid || null;
    });
  }

  private ref(path: string): StorageReference {
    return ref(this.storage, path);
  }

  async deleteFile(path: string): Promise<void> {
    await deleteObject(this.ref(path));
  }

  async uploadFile(
    path: string,
    file: Blob,
    filename: string,
    customMetadata: Record<string, unknown>,
    listener: UploadStatusUpdatedListener
  ): Promise<void> {
    const metadata = {
      contentDisposition: `inline; filename="${filename}"`,
      contentType: file.type,
      customMetadata: {
        ...customMetadata,
        ...(this.uid ? { owner: this.uid } : {})
      }
    };

    const fileRef = this.ref(path);
    const task = uploadBytesResumable(fileRef, file, metadata);

    await task.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        listener(snapshot.state, progress);
      },
      () => {
        listener('error', -1);
      },
      async () => {
        const downloadUrl = await getDownloadURL(fileRef);
        listener('success', 100, downloadUrl);
      }
    );
  }
}
