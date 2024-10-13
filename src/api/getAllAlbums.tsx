import { useData } from '../context/DataContext';
import { Album } from '../lib/types/types';

// Receive and return all albums
export default async function getAllAlbums(
  setError: (message: string) => void
) {
  const url = `http://localhost:3000/albums`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = response.text();
      throw new Error(`Server response: ${errorMessage}`);
    }
    const data = await response.json();
    return data as Album[];
  } catch (error) {
    setError(`Get items: ${error}`);
  }
}
