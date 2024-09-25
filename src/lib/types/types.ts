import { ReactNode } from 'react';

// Every item can only have one of these types
type ItemType = 'album' | 'cd' | 'track';

// A basic type with common properties
type Item = {
  type: ItemType;
  artist: string;
  featuringArtists?: string[];
  title: string;
  tags: string[];
  year: number;
  rating: number;
  extraInfo: string;
};

// Properties specific for an item of type Album
type Album = Item & {
  cdCount: number;
  cover: [
    {
      thumbnail: string;
      fullSize: string;
    }
  ];
};

// Properties specific for an item of type Cd
type Cd = Item & {
  cdCount: number;
  tracks: number;
  partOfAlbum?: string;
  cover: [
    {
      thumbnail: string;
      fullSize: string;
    }
  ];
};

// Properties specific for an item of type Track
type Track = Item & {
  cdTitle: string;
  trackNumber: number;
  length: number;
};

// Create a type for the children prop which contains other app components
type DataProviderProps = {
  children: ReactNode;
};

// Make sure the data is set with the correct types
type Context = {
  allAlbums: Album[];
  allCds: Cd[];
  allTracks: Track[];
};

export { ItemType, Album, Cd, Track, DataProviderProps, Context };
