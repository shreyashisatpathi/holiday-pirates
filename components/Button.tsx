import React, { FC } from 'react';
import classes from './Button.module.css';
type Props = {
  name: string;
  onClickHandler: () => void;
  disabled?: boolean;
};

const Button: FC<Props> = ({ name, onClickHandler, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      className={classes.button}
      onClick={onClickHandler}
    >
      {name}
    </button>
  );
};

export default Button;
