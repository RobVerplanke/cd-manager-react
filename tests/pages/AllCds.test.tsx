import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AllCdsPage } from '../../src/components/pages';

describe('All Cd page', () => {
  it('Renders the title', () => {
    render(<AllCdsPage />);

    const foundTitle = screen.getByText('List of all cds');

    expect(foundTitle).toBeInTheDocument();
  });
});
