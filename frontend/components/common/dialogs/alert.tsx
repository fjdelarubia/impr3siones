import React from 'react';
import DialogAction from './base/action';
import DialogActions from './base/actions';
import DialogContent from './base/content';
import Dialog from './base/dialog';
import DialogTitle from './base/title';

export interface AlertDialogContent {
  title: string;
  message: string | string[];
  close: () => void;
}

const AlertDialog: React.FC<AlertDialogContent> = ({
  close,
  title,
  message
}: AlertDialogContent) => {
  return (
    <Dialog close={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <DialogAction onClick={close}>Aceptar</DialogAction>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
