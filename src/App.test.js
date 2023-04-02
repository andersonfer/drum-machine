import { render, screen, within, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const KEYPAD = ['Q','W','E','A','S','D','Z','X','C'];

let targetButton;
let soundToBePlayed;
//this will hold a mock implementation of the play() method
let mockForPlayMethod;

beforeEach(() => {
  render(<App />);
  const randomKey = getRandomKeyFromKeypad();
  targetButton = screen.getByRole('button',{name:randomKey});
  soundToBePlayed = within(targetButton).getByTestId('audio-clip');
  mockForPlayMethod = jest.spyOn(soundToBePlayed, 'play').mockImplementation(() => {});
})

afterEach(() => {
  mockForPlayMethod.mockRestore();
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

it('should play an audio when a button is clicked', async () => {
  await userEvent.click(targetButton);
  expect(mockForPlayMethod).toHaveBeenCalledTimes(1);
});

it('should blink when a button is clicked', async () => {
  jest.useFakeTimers();

  await userEvent.click(targetButton);

  expect(targetButton).toHaveClass('active');
  // Advance the timer by 500ms to check if the class has been removed
  act(() => { jest.advanceTimersByTime(500); } );
  expect(targetButton.className).not.toContain('active');
});

it('shoud update display when a button is clicked', async () => {
  await userEvent.click(targetButton);
  expect(screen.getByText(targetButton.name)).toBeInTheDocument();
})

it('should play an audio when the right key is pressed',
  async () => {
    await userEvent.keyboard(targetButton.textContent);

    expect(mockForPlayMethod).toHaveBeenCalledTimes(1);

  });

it('should blink when the right key is pressed', async () => {
  jest.useFakeTimers();

  await userEvent.keyboard(targetButton.textContent);

  expect(targetButton).toHaveClass('active');
  // Advance the timer by 500ms to check if the class has been removed
  act(() => { jest.advanceTimersByTime(500); } );
  expect(targetButton.className).not.toContain('active');
});

it('should update display when the right key is pressed', async () => {
  await userEvent.keyboard(targetButton.textContent);
  expect(screen.getByText(targetButton.name)).toBeInTheDocument();
});
