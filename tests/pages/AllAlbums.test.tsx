import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AllAlbumsPage } from '../../src/components/pages';

describe('All Albums page', () => {
  it('Renders the title', () => {
    render(<AllAlbumsPage />);

    const foundTitle = screen.getByText('List of all albums');

    expect(foundTitle).toBeInTheDocument();
  });
});
