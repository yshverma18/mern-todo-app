
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App.jsx';  // ← Changed from './App'
import * as api from '../api.js';

vi.mock('../api.js');

test('marks a task as complete when checkbox is clicked', async () => {
  // Setup mock with initial task
  vi.mocked(api.fetchTasks).mockResolvedValue([
    { _id: '1', title: 'Test task', completed: false }
  ]);
  vi.mocked(api.updateTask).mockResolvedValue({
    _id: '1', title: 'Test task', completed: true
  });

  render(<App />);
  
  const checkbox = await screen.findByRole('checkbox');
  await userEvent.click(checkbox);
  
  expect(checkbox).toBeChecked();
});
