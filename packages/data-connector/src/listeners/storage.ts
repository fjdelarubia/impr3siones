export type UploadStatus =
  | 'success'
  | 'running'
  | 'paused'
  | 'error'
  | 'canceled';
export type UploadStatusUpdatedListener = (
  status: UploadStatus,
  progress: number,
  downloadUrl?: string
) => void;
