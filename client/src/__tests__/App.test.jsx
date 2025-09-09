import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App.jsx';
import * as api from '../api.js';

vi.mock('../api.js');

beforeEach(() => {
  vi.mocked(api.fetchTasks).mockResolvedValue([]);
  vi.mocked(api.addTask).mockImplementation(async (title) => ({
    _id: '1', title, completed: false
  }));
});

test('adds a task and shows it in the list', async () => {
  render(<App />);
  
  // Wait for the input to appear after loading
  const input = await screen.findByPlaceholderText(/add a new task/i);
  const button = screen.getByRole('button', { name: /add task/i });
  
  await userEvent.type(input, 'Learn MERN stack');
  await userEvent.click(button);
  
  expect(await screen.findByText('Learn MERN stack')).toBeInTheDocument();
});
