import React from 'react';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <div className={clsx(styles.button, className)} onClick={onClick}>
      {children}
    </div>
  );
};
