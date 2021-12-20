import React from 'react';
import { classnames } from '../utils/classnames';
import styles from './button.module.scss';

interface Props {
  className?: string;
  children: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<Props> = ({
  children,
  className,
  onClick,
  variant
}: Props) => {
  return (
    <button
      className={classnames(
        styles['button'],
        className,
        variant ? styles[`button--${variant}`] : ''
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
