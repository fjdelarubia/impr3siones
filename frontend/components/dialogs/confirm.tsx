import React from 'react';
import DialogAction from './base/action';
import DialogActions from './base/actions';
import DialogContent from './base/content';
import Dialog from './base/dialog';
import DialogTitle from './base/title';

export interface ConfirmDialogContent {
  title: string;
  message: string | string[] | React.ReactNode[];
  close: (result: boolean) => void;
  acceptLabel?: string;
  cancelLabel?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogContent> = ({
  close,
  title,
  message,
  cancelLabel,
  acceptLabel
}: ConfirmDialogContent) => {
  return (
    <Dialog close={() => close(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <DialogAction onClick={() => close(false)}>
          {cancelLabel || 'Cancelar'}
        </DialogAction>
        <DialogAction onClick={() => close(true)}>
          {acceptLabel || 'Aceptar'}
        </DialogAction>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
