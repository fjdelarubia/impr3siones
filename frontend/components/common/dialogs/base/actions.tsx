import React from 'react';
import { classnames } from '../../../../utils/classnames';
import styles from './actions.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const DialogActions: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <div className={classnames(styles['dialog-actions'], className)}>
      {children}
    </div>
  );
};

export default DialogActions;
