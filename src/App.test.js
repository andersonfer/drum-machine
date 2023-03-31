import { render, screen, within, fireEvent, act } from '@testing-library/react';
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

it('should blink, play an audio and update display when a button is clicked', async () => {
  render(<App />);
  jest.useFakeTimers();

  //TODO change it to test every button
  const button = screen.getByRole('button', {name:'Q'});
  const audio = within(button).getByTestId('audio-clip');
  //mock implementation of play() method from HTMLAudioElement
  const playSpy = jest.spyOn(audio, 'play').mockImplementation(() => {});

  await userEvent.click(button);

  expect(button).toHaveClass('active');
  expect(playSpy).toHaveBeenCalledTimes(1);
  expect(screen.getByText(button.name)).toBeInTheDocument();

  // Advance the timer by 500ms to check if the class has been removed
  act(() => { jest.advanceTimersByTime(500); } );
  expect(button.className).not.toContain('active');

  //TODO move it to a cleanup function
  playSpy.mockRestore();

});

it('should blink, play an audio and update display when the right key is pressed',
  async () => {
    jest.useFakeTimers();

    render(<App />);

    const keyToBePressed = 'Q'
    const button = screen.getByRole('button', {name:keyToBePressed});
    const audio = within(button).getByTestId('audio-clip');
    //mock implementation of play() method from HTMLAudioElement
    const playSpy = jest.spyOn(audio, 'play').mockImplementation(() => {});

    await userEvent.keyboard(keyToBePressed);

    expect(button).toHaveClass('active');
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByText(button.name)).toBeInTheDocument();

    // Advance the timer by 500ms to check if the class has been removed
    act(() => { jest.advanceTimersByTime(500); } );
    expect(button.className).not.toContain('active');

    //TODO move it to a cleanup function
    playSpy.mockRestore();
  });
