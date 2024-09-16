/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BrowserRouter, useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Login Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the login form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText('User:')).toBeInTheDocument();
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show an error message when the form is submitted with empty fields', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText('Email or password does not match. Please try again.')).toBeInTheDocument();
  });

  it('should navigate to the main page when the form is submitted with valid inputs', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText('User:'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText('Password:'), { target: { value: 'password12345test' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.queryByText('Email or password does not match. Please try again.')).not.toBeInTheDocument();
    expect(mockNavigate).toHaveBeenCalledWith('/main');
  });
});
