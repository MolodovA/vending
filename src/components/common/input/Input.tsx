import React, { ChangeEventHandler, FC } from 'react';

import style from './input.module.scss';

interface InputType {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
  isDisable: boolean;
}

export const Input: FC<InputType> = ({ isDisable, value, onChange, id }) => (
  <input
    className={style.input}
    id={id}
    type="text"
    disabled={isDisable}
    value={value}
    onChange={onChange}
    placeholder="..."
  />
);
