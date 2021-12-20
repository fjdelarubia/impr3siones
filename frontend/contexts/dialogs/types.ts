import { AlertDialogContent } from '../../components/dialogs/alert';
import { ConfirmDialogContent } from '../../components/dialogs/confirm';

export interface DialogQueueData {
  type: 'alert' | 'confirm';
  content: AlertDialogContent | ConfirmDialogContent;
}

export interface AlertDialogQueueData extends DialogQueueData {
  type: 'alert';
  content: AlertDialogContent;
}

export interface ConfirmDialogQueueData extends DialogQueueData {
  type: 'confirm';
  content: ConfirmDialogContent;
}

export function isAlertDialogContent(
  data?: DialogQueueData
): data is AlertDialogQueueData {
  return data?.type === 'alert';
}

export function isConfirmDialogContent(
  data?: DialogQueueData
): data is ConfirmDialogQueueData {
  return data?.type === 'confirm';
}
