/// <reference types="vitest" />
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import Main from './Main';
import { describe, it, expect } from 'vitest';

describe('Main Component', () => {
  it('should render the main page with initial contacts and add new contact button', () => {
    render(<Main />);

    expect(screen.getByText('Alain DELON')).toBeInTheDocument();
    expect(screen.getByText('Anthony HOPKINS')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add new contact/i })).toBeInTheDocument();
  });

  it('should filter contacts by name', () => {
    render(<Main />);

    fireEvent.change(screen.getByPlaceholderText('filter...'), { target: { value: 'al' } });

    expect(screen.getByText('Alain DELON')).toBeInTheDocument();
    expect(screen.getByText('Al PACINO')).toBeInTheDocument();
    expect(screen.queryByText('Anthony HOPKINS')).not.toBeInTheDocument();
  });

  it('should open and close the add contact popup', () => {
    render(<Main />);

    const addButton = screen.getByRole('button', { name: /add new contact/i }); 
    fireEvent.click(addButton);

    expect(screen.getByText('First name:')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByText('First name:')).not.toBeInTheDocument();
  });

  it('should select a contact and display details', () => {
    render(<Main />);

    const contactItem = screen.getByText('Alain DELON', { selector: '.contact-item' });
    fireEvent.click(contactItem);

    expect(screen.getByText('Alain DELON', { selector: 'h2' })).toBeInTheDocument();
    expect(screen.getByText('friends')).toBeInTheDocument();
  });
});
