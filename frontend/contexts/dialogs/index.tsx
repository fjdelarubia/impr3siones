import * as React from 'react';
import AlertDialog, {
  AlertDialogContent
} from '../../components/dialogs/alert';
import ConfirmationDialog, {
  ConfirmDialogContent
} from '../../components/dialogs/confirm';
import {
  DialogQueueData,
  isAlertDialogContent,
  isConfirmDialogContent
} from './types';

export interface DialogsContext {
  showAlertDialog: (
    content: Omit<AlertDialogContent, 'close'>
  ) => Promise<void>;
  showConfirmDialog: (
    content: Omit<ConfirmDialogContent, 'close'>
  ) => Promise<boolean>;
}

const Context = React.createContext<DialogsContext>({
  showAlertDialog: () => Promise.resolve(),
  showConfirmDialog: () => Promise.resolve(false)
});

interface Props {
  children: React.ReactNode;
}

export const DialogsProvider: React.FC<Props> = ({ children }: Props) => {
  const [dialogContents, setDialogContents] = React.useState<DialogQueueData[]>(
    []
  );

  const enqueueDialog = (dialogContent: DialogQueueData) => {
    setDialogContents((dialogs) => [...dialogs, dialogContent]);
  };

  const dequeueDialog = () => {
    setDialogContents((dialogs) => [...dialogs.slice(1)]);
  };

  const value: DialogsContext = {
    showAlertDialog: React.useCallback((content) => {
      return new Promise((resolve) => {
        enqueueDialog({
          type: 'alert',
          content: {
            ...content,
            close: () => {
              resolve();
              dequeueDialog();
            }
          }
        });
      });
    }, []),
    showConfirmDialog: React.useCallback((content) => {
      return new Promise((resolve) => {
        enqueueDialog({
          type: 'confirm',
          content: {
            ...content,
            close: (result: boolean) => {
              resolve(result);
              dequeueDialog();
            }
          }
        });
      });
    }, [])
  };

  const currentDialogContent = dialogContents[0];

  return (
    <Context.Provider value={value}>
      {children}
      {isAlertDialogContent(currentDialogContent) && (
        <AlertDialog {...currentDialogContent.content} />
      )}
      {isConfirmDialogContent(currentDialogContent) && (
        <ConfirmationDialog {...currentDialogContent.content} />
      )}
    </Context.Provider>
  );
};

export const DialogContextConsumer = Context.Consumer;

export default Context;
