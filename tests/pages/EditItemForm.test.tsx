import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ItemFormPage } from '../../src/components/pages';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const mockUseParams = vi.fn();
vi.mock('react-router-dom', () => ({
  MemoryRouter: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  useParams: () => mockUseParams(),
  Link: (props: { to: string; children: React.ReactNode }) => <a {...props} />,
}));

vi.mock('../../src/api/getItemById', () => ({
  __esModule: true,
  default: vi.fn().mockResolvedValue({
    id: '1',
    type: 'album',
    artist: 'Album Artist',
    featuringArtists: ['Other Artist', 'Another Artist'],
    title: 'Album title',
    albumYear: 2000,
    rating: 5,
    tags: ['rock', 'classic', 'pop'],
    extraInfo: 'My first album',
    cdsInAlbum: 4,
    cover: {
      albumThumbnail: 'https://placehold.co/30x30',
      albumFullSize: 'https://placehold.co/400x400',
    },
  }),
}));

describe('Edit details page', () => {
  mockUseParams.mockReturnValue({ id: '1' });

  it('Renders item details in form input fields', async () => {
    render(
      <MemoryRouter>
        <ItemFormPage isEditMode={true} />
      </MemoryRouter>
    );

    // Wait until "Loading data..." isn't displayed anymore
    await waitFor(() => {
      expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
    });

    // Check if mock details are loaden correctly

    // Artist name
    await waitFor(() => {
      expect(screen.getByLabelText('Artist name:')).toHaveValue('Album Artist');
    });

    // Featuring Artists
    await waitFor(() => {
      expect(screen.getByLabelText('Featuring artists:')).toHaveValue(
        'Other Artist,Another Artist'
      );
    });

    // Title
    await waitFor(() => {
      expect(screen.getByLabelText('Title:')).toHaveValue('Album title');
    });

    // Rating
    await waitFor(() => {
      expect(screen.getByLabelText('Rating:')).toHaveValue('5');
    });

    // Tags
    await waitFor(() => {
      expect(screen.getByLabelText('Tags:')).toHaveValue('rock,classic,pop');
    });

    // Extra Info
    await waitFor(() => {
      expect(screen.getByLabelText('Extra Info:')).toHaveValue(
        'My first album'
      );
    });

    //CD count
    await waitFor(() => {
      expect(screen.getByLabelText('Amount of CDs:')).toHaveValue(4);
    });

    // Year
    await waitFor(() => {
      expect(screen.getByLabelText('Release year:')).toHaveValue('2000');
    });

    // Cover thumbnail
    await waitFor(() => {
      expect(screen.getByLabelText('Thumbnail cover:')).toHaveValue(
        'https://placehold.co/30x30'
      );
    });

    // Cover full size
    await waitFor(() => {
      expect(screen.getByLabelText('Full Size cover:')).toHaveValue(
        'https://placehold.co/400x400'
      );
    });

    // Submit button
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();

    // Delete button
    const linkElement = screen.getByTestId('delete-link');
    expect(linkElement).toBeInTheDocument();
  });
});
