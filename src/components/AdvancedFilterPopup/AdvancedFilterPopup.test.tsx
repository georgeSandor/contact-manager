/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/react';
import AdvancedFilterPopup from './AdvancedFilterPopup';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';

describe('AdvancedFilterPopup Component', () => {
  const onClose = vi.fn();
  const onFilter = vi.fn();

  it('should render the advanced filter popup', () => {
    render(<AdvancedFilterPopup onClose={onClose} onFilter={onFilter} />);

    expect(screen.getByText('Advanced filter')).toBeInTheDocument();
    expect(screen.getByLabelText('Name filter:')).toBeInTheDocument();
    expect(screen.getByLabelText('Group select:')).toBeInTheDocument();
  });

  it('should submit the filter with correct values', () => {
    render(<AdvancedFilterPopup onClose={onClose} onFilter={onFilter} />);

    fireEvent.change(screen.getByLabelText('Name filter:'), { target: { value: 'Testname' } });
    fireEvent.change(screen.getByLabelText('Group select:'), { target: { value: 'work' } });
    fireEvent.click(screen.getByText('Filter'));
    expect(onFilter).toHaveBeenCalledWith('Testname', 'work');
  });

  it('should close the popup when cancel is clicked', () => {
    render(<AdvancedFilterPopup onClose={onClose} onFilter={onFilter} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });
});
