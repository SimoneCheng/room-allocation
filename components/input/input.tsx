'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import {
  useInputProps,
  type UseInputProps
} from './use-input-props';

const Input = forwardRef<HTMLInputElement, UseInputProps>((props, ref) => {
  const {
    type: typeProp = 'text',
    className: classNameProp,
    ...rest
  } = useInputProps(props);

  return (
    <input
      ref={ref}
      type={typeProp}
      className={clsx(
        'rounded border-2 border-gray-500 w-12 h-12 text-center',
        'disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed',
        classNameProp
      )}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
