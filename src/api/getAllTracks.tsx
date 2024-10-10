import { Track } from '../lib/types/types';

// Receive and return all tracks
export default async function getAllTracks() {
  const url = `http://localhost:3000/tracks`;
  const response = await fetch(url);
  const data = await response.json();
  return data as Track[];
}
