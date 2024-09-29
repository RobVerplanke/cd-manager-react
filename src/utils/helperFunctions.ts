import { Track } from '../lib/types/types';

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

// Sort the tracks alphabetically, or inverted
export function sortTracksByTitle(tracks: Track[], isSorted: boolean) {
  return isSorted
    ? [...tracks].sort((a, b) => a.title.localeCompare(b.title))
    : [...tracks].sort((a, b) => b.title.localeCompare(a.title));
}

// Sort the tracks on longest or shortest track length
export function sortTracksByLength(tracks: Track[], isSorted: boolean) {
  return isSorted
    ? [...tracks].sort((a, b) => a.length.localeCompare(b.length))
    : [...tracks].sort((a, b) => b.length.localeCompare(a.length));
}

// Sort the tracks on highest or lowest rating
export function sortTracksByRating(tracks: Track[], isSorted: boolean) {
  return isSorted
    ? [...tracks].sort((a, b) => a.rating - b.rating)
    : [...tracks].sort((a, b) => b.rating - a.rating);
}
