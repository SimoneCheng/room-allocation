'use client';

import {
  type ChangeEvent,
  type FocusEvent,
  type MouseEvent,
  type KeyboardEvent,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  useInputProps,
  type UseInputProps
} from '../input';

const getDecimalPlaces = (num: number) => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split('.')[1].length || 0;
};

export interface UseNumberInputProps extends Omit<UseInputProps, 'onChange' | 'onBlur'> {
  step?: number;
  min?: number;
  max?: number;
  value?: number;
  onChange?: (
    event: null | ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement> | FocusEvent<HTMLInputElement> | KeyboardEvent<HTMLInputElement>,
    value: number | undefined
  ) => void;
  onBlur?: (
    event: FocusEvent<HTMLInputElement>,
    value: number | undefined
  ) => void;
};

export const useNumberInput = (props: UseNumberInputProps = {}) => {
  const {
    step: stepProp = 1,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    pattern = '[0-9]*(.[0-9]+)?',
    inputMode = 'decimal',
    onChange: onChangeProp,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    value = 0,
    ...rest
  } = props;
  const valueAsString = value?.toString() ?? '';
  const inputProps = useInputProps(rest);
  const decimalPlaces = getDecimalPlaces(stepProp);

  const getInputProps = () => {
    return {
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value.match(/^[0-9]*[.]?[0-9]{0,2}$/g)) return;
        const targetValue = Number(e.target.value) ?? 0;
        onChangeProp?.(e, targetValue);
      },
      onBlur: (e: FocusEvent<HTMLInputElement>) => {
        const targetValue = Number(e.target.value) ?? 0;
        onBlurProp?.(e, targetValue);
      },
      onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const next = value + stepProp;
          if (next > max) return;
          onChangeProp?.(e, next);
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const prev = value - stepProp;
          if (prev < min) return;
          onChangeProp?.(e, prev);
        }
      },
      value: valueAsString,
      pattern,
      inputMode,
      ...inputProps
    };
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const intervalTime = useRef(0);
  const [isLongPress, setIsLongPress] = useState(false);
  const [action, setAction] = useState<'increment' | 'decrement'>('increment');

  useEffect(() => {
    if (!isLongPress) return;
    intervalRef.current = setInterval(() => {
      intervalTime.current += 1;
      if (action === 'increment') {
        const next = Number((value + stepProp * intervalTime.current).toFixed(decimalPlaces));
        if (next > max) return;
        onChangeProp?.(null, next);
      }
      if (action === 'decrement') {
        const prev = Number((value - stepProp * intervalTime.current).toFixed(decimalPlaces));
        if (prev < min) return;
        onChangeProp?.(null, prev);
      }
    }, 100);

    return () => {
      intervalTime.current = 0;
      clearInterval(intervalRef.current);
    }
  }, [action, isLongPress, max, min, onChangeProp, stepProp, value]);

  const getIncrementButtonProps = () => {
    return {
      onMouseDown: (e: MouseEvent<HTMLButtonElement>) => {
        if (inputProps.disabled) return;
        const next = Number((value + stepProp).toFixed(decimalPlaces));
        if (next > max) return;
        onChangeProp?.(e, next);
        timeoutRef.current = setTimeout(() => {
          setAction('increment');
          setIsLongPress(true);
        }, 500);
      },
      onMouseUp: () => {
        if (inputProps.disabled) return;
        clearTimeout(timeoutRef.current);
        setIsLongPress(false);
      }
    };
  };

  const getDecrementButtonProps = () => {
    return {
      onMouseDown: (e: MouseEvent<HTMLButtonElement>) => {
        if (inputProps.disabled) return;
        const prev = Number((value - stepProp).toFixed(decimalPlaces));
        if (prev < min) return;
        onChangeProp?.(e, prev);
        timeoutRef.current = setTimeout(() => {
          setAction('decrement');
          setIsLongPress(true);
        }, 500);
      },
      onMouseUp: () => {
        if (inputProps.disabled) return;
        clearTimeout(timeoutRef.current);
        setIsLongPress(false);
      }
    };
  };

  return {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps
  }
};
