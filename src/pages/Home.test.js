import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios'; 

import Home from './Home';

jest.mock('axios');

describe('Home Component', () => {
  

  test('renders task list when tasks are loaded', async () => {
    axios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: [{ _id: '1', title: 'Sample Task' }] }),
    });

    render(<Home />);

    const taskTitle = await screen.findByText('Sample Task');
    expect(taskTitle).toBeInTheDocument();
  });

});
