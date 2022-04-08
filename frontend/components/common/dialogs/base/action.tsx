import React from 'react';
import { classnames } from '../../../../utils/classnames';
import styles from './action.module.scss';

interface Props {
  className?: string;
  children: string;
  onClick: () => void;
}

const DialogAction: React.FC<Props> = ({
  children,
  className,
  onClick
}: Props) => {
  return (
    <button
      className={classnames(styles['dialog-action'], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DialogAction;
