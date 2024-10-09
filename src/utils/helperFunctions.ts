import { Album, Cd, Item, Track } from '../lib/types/types';

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

// Sort the items alphabetically, or inverted
export function sortItemsByTitle(
  items: (Album | Cd | Track)[],
  isSorted: boolean
) {
  return isSorted
    ? [...items].sort((a, b) => a.title.localeCompare(b.title))
    : [...items].sort((a, b) => b.title.localeCompare(a.title));
}

// Sort the items on amount of cds
export function sortItemsByAmount(items: Album[] | Cd[], isSorted: boolean) {
  return isSorted
    ? [...items].sort((a, b) => a.cdCount - b.cdCount)
    : [...items].sort((a, b) => b.cdCount - a.cdCount);
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
export function createNewItemObject(): Item {
  return {
    id: Date.now().toString(),
    type: 'unknown',
    artist: '',
    featuringArtists: [],
    title: '',
    year: 0,
    rating: 0,
    tags: [],
    extraInfo: '',
    specificFields: {
      album: {
        cdCount: 0,
        cover: {
          thumbnail: '',
          fullSize: '',
        },
      },
      cd: {
        cdCount: 0,
        trackCount: 0,
        partOfAlbum: '',
        cover: {
          thumbnail: '',
          fullSize: '',
        },
      },
      track: {
        cdTitle: '',
        trackNumber: 0,
        length: '',
      },
    },
  };
}
