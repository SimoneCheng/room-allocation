import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Button from './button';

test('should render button', () => {
  const { getByRole } = render(<Button />);
  const button = getByRole('button');
  expect(button).toBeInTheDocument();
});

test('Should be disabled', () => {
  const { getByTestId } = render(<Button disabled data-testid="btn" />);
  const buttonAsDiv = getByTestId('btn');
  expect(buttonAsDiv).toHaveAttribute('disabled');
});
