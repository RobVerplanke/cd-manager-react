import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ItemDetails } from '../../src/components/pages';
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

describe('Item details page', () => {
  mockUseParams.mockReturnValue({ id: 'string' });

  it('Renders item details', async () => {
    render(
      <MemoryRouter>
        <ItemDetails />
      </MemoryRouter>
    );

    // Wait until "Loading data..." isn't displayed anymore
    await waitFor(() => {
      expect(screen.queryByText('Loading data...')).not.toBeInTheDocument();
    });

    // Check if mock details are displayed correctly

    // ID
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    // Type
    expect(screen.getByText('Type:')).toBeInTheDocument();
    expect(screen.getByText('album')).toBeInTheDocument();

    // Artist name
    expect(screen.getByText('Artist name:')).toBeInTheDocument();
    expect(screen.getByText('Album Artist')).toBeInTheDocument();

    // Featuring Artists
    expect(screen.getByText('Featuring Artists:')).toBeInTheDocument();
    expect(
      screen.getByText('Other Artist, Another Artist')
    ).toBeInTheDocument();

    // Title
    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('Album title')).toBeInTheDocument();

    // Tags
    expect(screen.getByText('Tags:')).toBeInTheDocument();
    expect(screen.getByText('rock, classic, pop')).toBeInTheDocument();

    // Rating
    expect(screen.getByText('Rating:')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    // Extra Info
    expect(screen.getByText('Extra Info:')).toBeInTheDocument();
    expect(screen.getByText('My first album')).toBeInTheDocument();

    // Year
    expect(screen.getByText('Release year:')).toBeInTheDocument();
    expect(screen.getByText('2000')).toBeInTheDocument();

    //CD count
    expect(screen.getByText('CD Count:')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();

    // Cover full size
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://placehold.co/400x400');
  });
});
