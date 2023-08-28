import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Login from './Login';
import * as validation from '../validation';

describe('Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('displays error message on incorrect format', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(loginButton);

    const errorText = screen.getByTestId('error-message');
    expect(errorText).toBeInTheDocument();
  });

  test('redirects to home on correct credentials', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');

    jest.spyOn(validation, 'isEmailValid').mockReturnValue(true);
    jest.spyOn(validation, 'isPasswordValid').mockReturnValue(true);

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'strongpassword' } });
    fireEvent.click(loginButton);

    expect(history.location.pathname).toBe('/home');
  });

  test('does not redirect on invalid credentials', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Login />
      </Router>
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-button');

    jest.spyOn(validation, 'isEmailValid').mockReturnValue(false);
    jest.spyOn(validation, 'isPasswordValid').mockReturnValue(false);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(loginButton);

    const errorText = screen.getByTestId('error-message');
    expect(errorText).toBeInTheDocument();

    expect(history.location.pathname).toBe('/');
  });


});
