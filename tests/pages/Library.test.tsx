import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LibraryPage } from '../../src/components/pages';
import * as DataContext from '../../src/context/DataContext';
import { MemoryRouter } from 'react-router-dom';

// Mock data context
vi.mock('../components/context/DataContext.jsx');

const mockUseParams = vi.fn();
vi.mock('react-router-dom', () => {
  return {
    // Mock MemoryRouter
    MemoryRouter: (props: any) => <div>{props.children}</div>,

    // Mock Link component
    Link: (props: React.PropsWithChildren<{ to: string }>) => <a {...props} />,

    // Return mock useParams
    useParams: () => mockUseParams(), // Return mock useParams
  };
});

// Mock provided data
beforeEach(() => {
  vi.spyOn(DataContext, 'useData').mockReturnValue({
    allAlbums: [
      {
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
      },
    ],
    allCds: [
      {
        id: '2',
        type: 'cd',
        artist: 'CD Artist',
        featuringArtists: ['Other Artist', 'Another Artist'],
        title: 'CD title',
        cdYear: 1999,
        rating: 3,
        tags: ['metal', 'trance', 'rap'],
        extraInfo: 'My first CD',
        cdCount: 2,
        trackCount: 38,
        partOfAlbum: 'Album title',
        cover: {
          cdThumbnail: 'https://placehold.co/30x30',
          cdFullSize: 'https://placehold.co/400x400',
        },
      },
    ],
    allTracks: [
      {
        id: '3',
        type: 'track',
        artist: 'Track Artist',
        featuringArtists: ['Other Artist', 'Another Artist'],
        title: 'Track title',
        rating: 5,
        tags: ['dance', 'punk', 'indie'],
        extraInfo: 'My first track',
        cdTitle: 'CD title',
        trackNumber: 12,
        length: '4:52',
      },
    ],
    setError: () => null,
    setConfirmationMessage: () => null,
    error: '',
    confirmationMessage: '',
    setIsItemMutated: () => null,
  });
});

describe('Library page', () => {
  it('Renders sort buttons for Albums and CDs', () => {
    // Set category in useParams
    mockUseParams.mockReturnValue({ itemCategory: 'album' });

    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    );

    // Expect album to be rendered
    const name = screen.getByText('Name');
    const cds = screen.getByText('CDs');
    const rating = screen.getByText('Rating');
    const tags = screen.getByText('Tags');

    expect(name).toBeInTheDocument();
    expect(cds).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
  });

  it('Renders sort buttons for Tracks', () => {
    // Set category in useParams
    mockUseParams.mockReturnValue({ itemCategory: 'track' });

    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    );

    // Expect album to be rendered
    const name = screen.getByText('Name');
    const cds = screen.getByText('Length');
    const rating = screen.getByText('Rating');
    const tags = screen.getByText('Tags');

    expect(name).toBeInTheDocument();
    expect(cds).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
    expect(tags).toBeInTheDocument();
  });

  it('Renders album item', () => {
    // Set category in useParams
    mockUseParams.mockReturnValue({ itemCategory: 'album' });

    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    );

    // Expect album to be rendered
    const title = screen.getByText('Album title');
    const artist = screen.getByText('Album Artist');
    const cdsInAlbum = screen.getByText('4');
    const tagOne = screen.getByText('rock');
    const tagTwo = screen.getByText('classic');
    const tagThree = screen.getByText('pop');

    expect(title).toBeInTheDocument();
    expect(artist).toBeInTheDocument();
    expect(cdsInAlbum).toBeInTheDocument();
    expect(tagOne).toBeInTheDocument();
    expect(tagTwo).toBeInTheDocument();
    expect(tagThree).toBeInTheDocument();
  });

  it('Renders CD item', () => {
    // Set category in useParams
    mockUseParams.mockReturnValue({ itemCategory: 'cd' });
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    );

    // Expect CD to be rendered
    const title = screen.getByText('CD title');
    const artist = screen.getByText('CD Artist');
    const cdCount = screen.getByText('2');
    const tagOne = screen.getByText('metal');
    const tagTwo = screen.getByText('trance');
    const tagThree = screen.getByText('rap');

    expect(title).toBeInTheDocument();
    expect(artist).toBeInTheDocument();
    expect(cdCount).toBeInTheDocument();
    expect(tagOne).toBeInTheDocument();
    expect(tagTwo).toBeInTheDocument();
    expect(tagThree).toBeInTheDocument();
  });

  it('Renders track item', () => {
    // Set category in useParams
    mockUseParams.mockReturnValue({ itemCategory: 'track' });
    render(
      <MemoryRouter>
        <LibraryPage />
      </MemoryRouter>
    );

    // Expect track to be rendered
    const title = screen.getByText('Track title');
    const artist = screen.getByText('Track Artist');
    const length = screen.getByText('4:52');
    const tagOne = screen.getByText('dance');
    const tagTwo = screen.getByText('punk');
    const tagThree = screen.getByText('indie');

    expect(title).toBeInTheDocument();
    expect(artist).toBeInTheDocument();
    expect(length).toBeInTheDocument();
    expect(tagOne).toBeInTheDocument();
    expect(tagTwo).toBeInTheDocument();
    expect(tagThree).toBeInTheDocument();
  });
});
