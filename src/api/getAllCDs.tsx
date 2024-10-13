import { useData } from '../context/DataContext';
import { Cd } from '../lib/types/types';

// Receive and return all cds
export default async function getAllCDs(setError: (message: string) => void) {
  const url = `http://localhost:3000/cds`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = response.text();
      throw new Error(`Server response: ${errorMessage}`);
    }

    const data = await response.json();
    return data as Cd[];
  } catch (error) {
    setError(`Get items: ${error}`);
  }
}
