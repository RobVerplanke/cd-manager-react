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

  it('Renders No items found message', async () => {
    // Mock user that makes search
    const user = userEvent.setup();

    render(<SearchItemPage />);

    // Fill in the search input
    await user.type(screen.getByTestId('search-bar'), 'Rock');

    // Press the submit button
    const searchButton = screen.getByTestId('search-button');
    await user.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('No items found...')).toBeInTheDocument();
    });
  });
});
