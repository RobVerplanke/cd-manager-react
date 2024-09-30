import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LibraryPage } from '../../src/components/pages';

describe('All Albums page', () => {
  it('Renders the title', () => {
    render(<LibraryPage />);

    const foundTitle = screen.getByText('An overview of your albums');

    expect(foundTitle).toBeInTheDocument();
  });
});
