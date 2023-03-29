import { render, screen } from '@testing-library/react';
import App from './App';

it('should render properly', () => {
  render(<App />);

  screen.getByRole('heading', {name:/the incredible drum machine/i});

});
