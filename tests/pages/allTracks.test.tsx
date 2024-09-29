import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AllTracksPage } from '../../src/components/pages';

describe('All Cd page', () => {
  it('Renders the title', () => {
    render(<AllTracksPage />);

    const foundTitle = screen.getByText('An overview of your tracks');

    expect(foundTitle).toBeInTheDocument();
  });
});
