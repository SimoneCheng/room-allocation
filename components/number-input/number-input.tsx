'use client';

import { clsx } from 'clsx';
import { Button } from '../button';
import { Input } from '../input';
import { useNumberInput, type UseNumberInputProps } from './use-number-input';

const NumberInput = (props: UseNumberInputProps) => {
  const {
    getInputProps,
    getDecrementButtonProps,
    getIncrementButtonProps
  } = useNumberInput(props);

  return (
    <div className='flex'>
      <Button
        className={clsx(
          'text-2xl select-none',
          (props.value === props.min || props.disabled) && 'border-gray-300 text-gray-300 cursor-not-allowed'
        )}
        {...getDecrementButtonProps()}
      >
        −
      </Button>
      <Input
        className='mx-2 text-base'
        {...getInputProps()}
      />
      <Button
        className={clsx(
          'text-2xl select-none',
          (props.value === props.max || props.disabled) && 'border-gray-300 text-gray-300 cursor-not-allowed'
        )}
        {...getIncrementButtonProps()}
      >
        ＋
      </Button>
    </div>
  )
};

export default NumberInput;
