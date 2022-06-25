import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App', () => {
  render(<App />);
  const text = screen.getByText(/App/i);
  expect(text).toBeInTheDocument();
});
