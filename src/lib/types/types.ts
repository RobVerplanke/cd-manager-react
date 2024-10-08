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

// Cards can only be created with one of these types
type ItemCardProps = Track;
type ItemWithCoverCardProps = Album | Cd;

// Every item can only be one of these types
type ItemType = 'album' | 'cd' | 'track' | 'unknown';

// Tags must be a string
type Tag = string;

// A base type with common properties
type Item = {
  id: string;
  type: ItemType;
  artist: string;
  featuringArtists?: string[];
  title: string;
  tags: string[];
  year: number;
  rating: number;
  extraInfo: string;
  specificFields: {
    album: {
      cdCount: number;
      cover: {
        thumbnail: string;
        fullSize: string;
      };
    };
    cd: {
      cdCount: number;
      trackCount: number;
      partOfAlbum?: string;
      cover: {
        thumbnail: string;
        fullSize: string;
      };
    };
    track: {
      cdTitle: string;
      trackNumber: number;
      length: string;
    };
  };
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
  Item,
  ItemType,
  ItemCardProps,
  ItemWithCoverCardProps,
  Tag,
  Album,
  Cd,
  Track,
  DataProviderProps,
  Context,
};
