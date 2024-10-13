import { Dispatch, ReactNode, SetStateAction } from 'react';

// A type for the children prop in the DataProvider component
type DataProviderProps = {
  children: ReactNode;
};

// Make sure the context data is set with the correct types
type Context = {
  setError: Dispatch<SetStateAction<string | null>>;
  setConfirmationMessage: Dispatch<SetStateAction<string | null>>;
  error: string | null;
  confirmationMessage: string | null;
  allAlbums: Album[];
  allCds: Cd[];
  allTracks: Track[];
  setIsItemMutated: Dispatch<SetStateAction<boolean>>;
};

// Cards can only be created with one of these types
type ItemCardProps = Track;
type ItemWithCoverCardProps = Album | Cd;

// Tags must be a string
type Tag = string;

// Every item can only be one of these types
type ItemType = 'album' | 'cd' | 'track';

// Properties specific for an item of type Album
type Album = {
  id: string;
  type: 'album';
  artist: string;
  featuringArtists?: string[];
  title: string;
  tags: string[];
  year: number;
  rating: number;
  extraInfo: string;
  cdCount: number;
  cover: {
    thumbnail: string;
    fullSize: string;
  };
};

// Properties specific for an item of type Cd
type Cd = {
  id: string;
  type: 'cd';
  artist: string;
  featuringArtists?: string[];
  title: string;
  tags: string[];
  year: number;
  rating: number;
  extraInfo: string;
  cdCount: number;
  trackCount: number;
  partOfAlbum?: string;
  cover: {
    thumbnail: string;
    fullSize: string;
  };
};

// Properties specific for an item of type Track
type Track = {
  id: string;
  type: 'track';
  artist: string;
  featuringArtists?: string[];
  title: string;
  tags: string[];
  year: number;
  rating: number;
  extraInfo: string;
  cdTitle: string;
  trackNumber: number;
  length: string;
};

// An Item can only be an album, cd or a track
type Item = Album | Cd | Track;

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
