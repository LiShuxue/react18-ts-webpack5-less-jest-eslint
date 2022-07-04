import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from 'src/pages/home';

test('renders home text', () => {
  render(<Home />);
  const ele = screen.getByText('home');
  expect(ele).toBeInTheDocument();
});
