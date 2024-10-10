import { Album } from '../lib/types/types';

// Receive and return all albums
export default async function getAllAlbums() {
  const url = `http://localhost:3000/albums`;
  const response = await fetch(url);
  const data = await response.json();
  return data as Album[];
}
