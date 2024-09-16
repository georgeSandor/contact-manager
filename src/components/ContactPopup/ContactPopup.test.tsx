/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import ContactPopup from './ContactPopup';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

describe('ContactPopup Component', () => {
  const onClose = vi.fn();
  const onSubmit = vi.fn();

  it('should render the add contact popup', () => {
    render(<ContactPopup onClose={onClose} onSubmit={onSubmit} mode="add" />);

    expect(screen.getByText('Add new contact')).toBeInTheDocument();
    expect(screen.getByLabelText('First name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Last name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Group:')).toBeInTheDocument();
  });

  it('should submit the form with the correct values', () => {
    render(<ContactPopup onClose={onClose} onSubmit={onSubmit} mode="add" />);

    fireEvent.change(screen.getByLabelText('First name:'), { target: { value: 'firstNameTest' } });
    fireEvent.change(screen.getByLabelText('Last name:'), { target: { value: 'lastNameTest' } });
    fireEvent.change(screen.getByLabelText('Group:'), { target: { value: 'family' } });
    fireEvent.click(screen.getByText('OK'));

    expect(onSubmit).toHaveBeenCalledWith('firstNameTest', 'lastNameTest', 'family');
  });

  it('should close the popup when cancel is clicked', () => {
    render(<ContactPopup onClose={onClose} onSubmit={onSubmit} mode="add" />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });
});
