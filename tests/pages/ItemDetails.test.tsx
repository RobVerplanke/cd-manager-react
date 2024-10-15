import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ItemDetails } from '../../src/components/pages';
import * as DataContext from '../../src/context/DataContext';
import { MemoryRouter } from 'react-router-dom'; // Voeg dit toe
import React from 'react';
import { Album } from '../../src/lib/types/types';

// Mock de getItemById module
vi.mock('../../api/getItemById', () => ({
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

// Mock data context
vi.mock('../../src/context/DataContext');

beforeEach(() => {
  const mockedItem: Album = {
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
  };

  // Mocking the useData hook to return the mocked item
  vi.spyOn(DataContext, 'useData').mockReturnValue({
    allAlbums: [mockedItem], // Mock here to ensure it returns the item
    allCds: [],
    allTracks: [],
    setError: () => null,
    setConfirmationMessage: () => null,
    error: '',
    confirmationMessage: '',
    setIsItemMutated: () => null,
  });
});

describe('Item details page', () => {
  it('Renders detailed information of an item', async () => {
    // Gebruik MemoryRouter om de route te mocken
    render(
      <MemoryRouter initialEntries={['/item/1']}>
        <ItemDetails />
      </MemoryRouter>
    );

    // Gebruik waitFor om te wachten tot het item geladen is
    await waitFor(() => {
      expect(screen.getByText('ID:')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('Artist name: Album Artist')).toBeInTheDocument();
      expect(
        screen.getByText('Featuring Artists: Other Artist, Another Artist')
      ).toBeInTheDocument();
      expect(screen.getByText('Title: Album title')).toBeInTheDocument();
      expect(screen.getByText('Release year: 2000')).toBeInTheDocument();
      expect(screen.getByText('Rating:')).toBeInTheDocument(); // Zorg dat je de volledige tekst matcht
      expect(screen.getByText('Tags: rock, classic, pop')).toBeInTheDocument();
      expect(
        screen.getByText('Extra Info: My first album')
      ).toBeInTheDocument();
      expect(screen.getByText('Cover:')).toBeInTheDocument(); // Of een andere match, afhankelijk van de tekst
    });
  });
});
