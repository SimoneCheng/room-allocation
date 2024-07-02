'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { dataAttr } from '@/utils';

export interface UseInputProps extends ComponentPropsWithoutRef<'input'> {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  isChecked?: boolean;
  isInvalid?: boolean;
  isLoading?: boolean;
};

export const useInputProps = (props: UseInputProps) => {
  const {
    disabled,
    readOnly,
    required,
    checked,
    isDisabled,
    isReadOnly,
    isRequired,
    isChecked,
    isLoading,
    isInvalid,
    ...rest
  } = props;

  return {
    disabled: disabled ?? isDisabled ?? isLoading,
    readOnly: readOnly ?? isReadOnly,
    required: required ?? isRequired,
    checked: checked ?? isChecked,
    'data-invalid': dataAttr(isInvalid),
    ...rest
  };
};
