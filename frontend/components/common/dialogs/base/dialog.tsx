import React from 'react';
import styles from './dialog.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  close: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<Props> = ({ close, children }: Props) => {
  return (
    <div className={styles['dialog']}>
      <div className={styles['dialog__overlay']} onClick={close}></div>
      <div className={styles['dialog__modal']}>
        <div className={styles['dialog__modal__close']} onClick={() => close()}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
