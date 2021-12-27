import React from 'react';
import { classnames } from '../../../utils/classnames';
import styles from './title.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const DialogTitle: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <h3 className={classnames(styles['dialog-title'], className)}>
      {children}
    </h3>
  );
};

export default DialogTitle;
