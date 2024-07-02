'use client';

import { useState } from 'react';
import { NumberInput } from '@/components/number-input';

const Demo3 = () => {
  const [value, setValue] = useState<number | undefined>(2);
  return (
    <NumberInput
      name="test"
      value={value}
      min={1}
      max={10}
      step={1}
      onChange={(_, value) => setValue(value)}
      onBlur={(_, value) => {
        if (!value) {
          setValue(0);
        } else if (value > 10) {
          setValue(10);
        } else if (value < 1) {
          setValue(1);
        }
      }}
      disabled={true}
    />
  );
};

export default Demo3;
