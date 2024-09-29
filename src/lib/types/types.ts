import { ReactNode } from 'react';

// A type for the children prop in the DataProvider component
type DataProviderProps = {
  children: ReactNode;
};

// Make sure the context data is set with the correct types
type Context = {
  allAlbums: Album[];
  allCds: Cd[];
  allTracks: Track[];
};

// Every item can only be one of these types
type ItemType = 'album' | 'cd' | 'track';

// Cards can only be created with one of these types
type RenderVerticalCardProps = Album;
type RenderHorizontalCardProps = Cd | Track;

// A base type with common properties
type Item = {
  id: number;
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
  cover: {
    thumbnail: string;
    fullSize: string;
  };
};

// Properties specific for an item of type Cd
type Cd = Item & {
  cdCount: number;
  trackCount: number;
  partOfAlbum?: string;
  cover: {
    thumbnail: string;
    fullSize: string;
  };
};

// Properties specific for an item of type Track
type Track = Item & {
  cdTitle: string;
  length: string;
};

export {
  ItemType,
  RenderVerticalCardProps,
  RenderHorizontalCardProps,
  Album,
  Cd,
  Track,
  DataProviderProps,
  Context,
};
