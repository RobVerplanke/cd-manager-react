import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LibraryPage } from '../../src/components/pages';

describe('All Cd page', () => {
  it('Renders the title', () => {
    render(<LibraryPage />);

    const foundTitle = screen.getByText('An overview of your CDs');

    expect(foundTitle).toBeInTheDocument();
  });
});
