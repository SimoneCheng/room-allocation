import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import Input from './input';

test('should render input', () => {
  const { getByTestId } = render(<Input data-testid="input" />);
  const input = getByTestId('input');
  expect(input).toBeInTheDocument();
});

test('should be disabled', () => {
  const { getByTestId } = render(<Input data-testid="disabled-input" disabled />);
  const input = getByTestId('disabled-input');
  expect(input).toHaveAttribute('disabled');
});

test('should be read only', () => {
  const { getByTestId } = render(<Input data-testid="readonly-input" readOnly />);
  const input = getByTestId('readonly-input');
  expect(input).toHaveAttribute('readonly');
});

test('should be required', () => {
  const { getByTestId } = render(<Input data-testid="required-input" required />);
  const input = getByTestId('required-input');
  expect(input).toHaveAttribute('required');
});

test('should be checked', () => {
  const { getByTestId } = render(<Input data-testid="checked-input" checked />);
  const input = getByTestId('checked-input');
  expect(input).toHaveAttribute('checked');
});
