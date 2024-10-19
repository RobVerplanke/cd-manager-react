import { MIN_RELEASE_YEAR } from '../lib/constants';
import {
  type ItemType,
  type Album,
  type Cd,
  type Item,
  type Track,
} from '../lib/types/types';

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

// Capitalize string
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Generate unique ID as string
export const generateId = () => Date.now().toString();

// Generate select options for release year
export function getReleaseYearRange() {
  const currentYear = new Date().getFullYear() + 1;

  // Create array with numbers in a range between minimum year and maximum year
  const options = Array.from(
    { length: currentYear - MIN_RELEASE_YEAR },
    (_, i) => i + MIN_RELEASE_YEAR
  );
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

// Used for type narrowing

export function isItemType(input: string | number): input is ItemType {
  return ['album', 'cd', 'track'].includes(input as string);
}

export function getBestAlbums(items: (Album | Cd | Track)[], limit: number) {
  return items.sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function isAlbum(item: Item): item is Album {
  return item.type === 'album';
}

export function isCd(item: Item): item is Cd {
  return item.type === 'cd';
}

export function isTrack(item: Item): item is Track {
  return item.type === 'track';
}

export function isNumber(item: number | string): item is number {
  return typeof (item as number) === 'number';
}

// Sort the items on amount of cds
export function sortItemsByAmount(
  items: Album[] | Cd[],
  isSorted: boolean,
  itemCategory: string
) {
  switch (itemCategory) {
    case 'cd':
      return isSorted
        ? [...items].sort((a, b) =>
            isCd(a) && isCd(b) ? a.cdCount - b.cdCount : 0
          )
        : [...items].sort((a, b) =>
            isCd(a) && isCd(b) ? b.cdCount - a.cdCount : 0
          );
    case 'album':
      return isSorted
        ? [...items].sort((a, b) =>
            isAlbum(a) && isAlbum(b) ? a.cdsInAlbum - b.cdsInAlbum : 0
          )
        : [...items].sort((a, b) =>
            isAlbum(a) && isAlbum(b) ? b.cdsInAlbum - a.cdsInAlbum : 0
          );
    default:
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
        id: Date.now().toString(),
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
        id: Date.now().toString(),
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
        id: Date.now().toString(),
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
