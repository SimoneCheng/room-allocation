'use client';

import { useState } from "react";
import { NumberInput } from "@/components/number-input";

export default function Home() {
  const [value, setValue] = useState<number | undefined>(2);
  return (
    <main>
      <NumberInput
        name="test"
        value={value}
        min={1}
        max={10}
        step={1}
        onChange={(e, value) => setValue(value)}
        onBlur={(e, value) => {
          if (!value) {
            setValue(0);
          } else if (value > 10) {
            setValue(10);
          } else if (value < 1) {
            setValue(1);
          }
        }}
      />
    </main>
  );
}
