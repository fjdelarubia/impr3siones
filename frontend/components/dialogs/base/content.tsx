import React from 'react';
import { classnames } from '../../../utils/classnames';
import styles from './content.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const DialogContent: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <div className={classnames(styles['dialog-content'], className)}>
      {children}
    </div>
  );
};

export default DialogContent;
