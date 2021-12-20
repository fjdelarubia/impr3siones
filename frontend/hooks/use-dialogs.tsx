import * as React from 'react';

import DialogContext, { DialogsContext } from '../contexts/dialogs';

const useDialogs = (): DialogsContext => {
  const context = React.useContext(DialogContext);
  if (context === undefined) {
    throw new Error('useDialogs must be used within a DialogsProvider');
  }

  return context;
};

export default useDialogs;
