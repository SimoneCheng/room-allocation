'use client';

import { forwardRef } from 'react';
import type { ComponentPropsWithRef } from 'react';
import clsx from 'clsx';

const Button = forwardRef<HTMLButtonElement, ComponentPropsWithRef<'button'>>((props, ref) => {
  const {
    type: typeProp = 'button',
    className: classNameProp,
    children,
    ...rest
  } = props;
  return (
    <button
      type={typeProp}
      className={clsx(
        'w-12 h-12 rounded border-2 border-blue-400 text-center text-blue-400',
        'disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed',
        classNameProp
      )}
      {...rest}
    >
      {children}
    </button>
  )
});

Button.displayName = 'Button';

export default Button;
