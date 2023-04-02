import { render, screen, within, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const KEYPAD = ['Q','W','E','A','S','D','Z','X','C'];

let targetButton;
let soundToBePlayed;

beforeEach(() => {
  render(<App />);
  const randomKey = getRandomKeyFromKeypad();
  targetButton = screen.getByRole('button',{name:randomKey});
  soundToBePlayed = within(targetButton).getByTestId('audio-clip');
})

getRandomKeyFromKeypad = () => {
  return KEYPAD[Math.floor(Math.random() * KEYPAD.length)];
}

it('should render properly', () => {
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
  jest.useFakeTimers();

  //mock implementation of play() method from HTMLAudioElement
  const playSpy = jest.spyOn(soundToBePlayed, 'play').mockImplementation(() => {});

  await userEvent.click(targetButton);

  expect(targetButton).toHaveClass('active');
  expect(playSpy).toHaveBeenCalledTimes(1);
  expect(screen.getByText(targetButton.name)).toBeInTheDocument();

  // Advance the timer by 500ms to check if the class has been removed
  act(() => { jest.advanceTimersByTime(500); } );
  expect(targetButton.className).not.toContain('active');

  //TODO move it to a cleanup function
  playSpy.mockRestore();

});

it('should blink, play an audio and update display when the right key is pressed',
  async () => {
    jest.useFakeTimers();

    //mock implementation of play() method from HTMLAudioElement
    const playSpy = jest.spyOn(soundToBePlayed, 'play').mockImplementation(() => {});

    await userEvent.keyboard(targetButton.textContent);

    expect(targetButton).toHaveClass('active');
    expect(playSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByText(targetButton.name)).toBeInTheDocument();

    // Advance the timer by 500ms to check if the class has been removed
    act(() => { jest.advanceTimersByTime(500); } );
    expect(targetButton.className).not.toContain('active');

    //TODO move it to a cleanup function
    playSpy.mockRestore();
  });
