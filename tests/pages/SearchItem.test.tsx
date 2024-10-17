import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SearchItemPage from '../../src/components/pages/SearchItem';
import userEvent from '@testing-library/user-event';

describe('Search form', () => {
  it('Renders input field and search button', () => {
    render(<SearchItemPage />);

    const searchBar = screen.getByTestId('search-bar');
    expect(searchBar).toBeInTheDocument();

    const searchButton = screen.getByTestId('search-button');
    expect(searchButton).toBeInTheDocument();
  });
});
