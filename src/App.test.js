import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

it('should render properly', () => {
  render(<App />);

  screen.getByRole('heading', {name:/the incredible drum machine/i});

  screen.getByRole('button', {name:'Q'});
  screen.getByRole('button', {name:'W'});
  screen.getByRole('button', {name:'E'});
  screen.getByRole('button', {name:'A'});
  screen.getByRole('button', {name:'S'});
  screen.getByRole('button', {name:'D'});
  screen.getByRole('button', {name:'Z'});
  screen.getByRole('button', {name:'X'});
  screen.getByRole('button', {name:'C'});

  screen.getByText(/press a key/i);
});

it('should play an audio and update display when a button is clicked', async () => {
  render(<App />);
  //TODO change it to test every button
  const button = screen.getByRole('button', {name:'Q'});
  const audio = within(button).getByTestId('audio-clip');
  //mock implementation of play() method from HTMLAudioElement
  const playSpy = jest.spyOn(audio, 'play').mockImplementation(() => {});


  await userEvent.click(button);

  expect(playSpy).toHaveBeenCalled();
  expect(screen.getByText(button.name)).toBeInTheDocument();

  //TODO move it to a cleanup function
  playSpy.mockRestore();

});
