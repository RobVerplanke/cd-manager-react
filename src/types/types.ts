type ItemType = 'album' | 'cd' | 'track';

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

type Album = Item & {
  cdCount: number;
  cover: [
    {
      thumbnail: string;
      fullSize: string;
    }
  ];
};

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

type Track = Item & {
  cdTitle: string;
  trackNumber: number;
  length: number;
};

export { ItemType, Album, Cd, Track };
