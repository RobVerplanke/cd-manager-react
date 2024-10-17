import { type Track } from '../lib/types/types';

// Receive and return all tracks
export default async function getAllTracks(
  setError: (message: string) => void
) {
  const url = `http://localhost:3000/tracks`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = response.text();
      throw new Error(`Server response: ${errorMessage}`);
    }

    const data = await response.json();
    return data as Track[];
  } catch (error) {
    setError(`Get items: ${error}`);
  }
}
