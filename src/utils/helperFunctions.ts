import { Album, Cd, Item, ItemType, Track } from '../lib/types/types';

// Measure rendering performance
export function onRender(
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  console.log(
    'Profiler data: ',
    'id: ',
    id,
    'phase: ',
    phase,
    'actualDuration: ',
    actualDuration,
    'baseDuration: ',
    baseDuration,
    'startTime: ',
    startTime,
    'commitTime: ',
    commitTime
  );
}

// Generate unique ID as string
export const generateId = () => Date.now().toString();

// Generate select options for release year
export function getReleaseYearRange() {
  const options = [];
  const currentYear = new Date().getFullYear() + 1;

  for (let i = 1900; i < currentYear; i++) {
    options.push(i);
  }

  return options.reverse();
}

// Sort the items alphabetically, or inverted
export function sortItemsByTitle(
  items: (Album | Cd | Track)[],
  isSorted: boolean
) {
  return isSorted
    ? [...items].sort((a, b) => a.title.localeCompare(b.title))
    : [...items].sort((a, b) => b.title.localeCompare(a.title));
}

export function isAlbum(item: Item): item is Album {
  return item.type === 'album';
}

export function isCd(item: Item): item is Cd {
  return item.type === 'cd';
}

// Sort the items on amount of cds
export function sortItemsByAmount(
  items: Album[] | Cd[],
  isSorted: boolean,
  itemCategory: string
) {
  // Check if the items are CDs or Albums
  if (itemCategory === 'cd') {
    // Sort CDs by cdCount
    return isSorted
      ? [...items].sort((a, b) =>
          isCd(a) && isCd(b) ? a.cdCount - b.cdCount : 0
        )
      : [...items].sort((a, b) =>
          isCd(a) && isCd(b) ? b.cdCount - a.cdCount : 0
        );
  } else if (itemCategory === 'album') {
    // Sort Albums by cdsInAlbum
    return isSorted
      ? [...items].sort((a, b) =>
          isAlbum(a) && isAlbum(b) ? a.cdsInAlbum - b.cdsInAlbum : 0
        )
      : [...items].sort((a, b) =>
          isAlbum(a) && isAlbum(b) ? b.cdsInAlbum - a.cdsInAlbum : 0
        );
  } else {
    // Default return for unknown categories
    return items;
  }
}

// Sort the items on highest or lowest rating
export function sortItemsByRating(
  items: Album[] | Cd[] | Track[],
  isSorted: boolean
) {
  return isSorted
    ? [...items].sort((a, b) => a.rating - b.rating)
    : [...items].sort((a, b) => b.rating - a.rating);
}

// Sort the items on longest or shortest length
export function sortItemsByLength(items: Track[], isSorted: boolean) {
  return isSorted
    ? [...items].sort((a, b) => a.length.localeCompare(b.length))
    : [...items].sort((a, b) => b.length.localeCompare(a.length));
}

// Template for new item
export function createNewItemObject(type: 'album' | 'cd' | 'track'): Item {
  switch (type) {
    case 'album':
      return {
        id: generateId(),
        type: 'album',
        artist: '',
        featuringArtists: [],
        title: '',
        albumYear: 2000,
        rating: 0,
        tags: [],
        extraInfo: '',
        cdsInAlbum: 0,
        cover: {
          albumThumbnail: '',
          albumFullSize: '',
        },
      };
    case 'cd':
      return {
        id: generateId(),
        type: 'cd',
        artist: '',
        featuringArtists: [],
        title: '',
        cdYear: 2000,
        rating: 0,
        tags: [],
        extraInfo: '',
        cdCount: 0,
        trackCount: 0,
        partOfAlbum: '',
        cover: {
          cdThumbnail: '',
          cdFullSize: '',
        },
      };
    case 'track':
      return {
        id: generateId(),
        type: 'track',
        artist: '',
        featuringArtists: [],
        title: '',
        rating: 0,
        tags: [],
        extraInfo: '',
        cdTitle: '',
        trackNumber: 0,
        length: '',
      };
    default:
      throw new Error(`Unsupported item type: ${type}`);
  }
}

export const defaultAlbum: Album = {
  id: generateId(),
  type: 'album',
  artist: '',
  featuringArtists: [],
  title: '',
  tags: [],
  albumYear: 2000,
  rating: 0,
  extraInfo: '',
  cdsInAlbum: 0,
  cover: {
    albumThumbnail: '',
    albumFullSize: '',
  },
};

export const defaultCd: Cd = {
  id: generateId(),
  type: 'cd',
  artist: '',
  featuringArtists: [],
  title: '',
  tags: [],
  cdYear: 2000,
  rating: 0,
  extraInfo: '',
  cdCount: 0,
  trackCount: 0,
  partOfAlbum: '',
  cover: {
    cdThumbnail: '',
    cdFullSize: '',
  },
};

export const defaultTrack: Track = {
  id: generateId(),
  type: 'track',
  artist: '',
  featuringArtists: [],
  title: '',
  tags: [],
  rating: 0,
  extraInfo: '',
  cdTitle: '',
  trackNumber: 0,
  length: '',
};
