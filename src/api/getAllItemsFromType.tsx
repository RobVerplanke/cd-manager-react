import { useData } from '../context/DataContext';
import { ItemType, Album, Cd, Track } from '../lib/types/types';

// Receive and return a list which contains objects of the corresponding item type
export default async function getAllItemsFromType(
  type: ItemType,
  setError: (message: string) => void
) {
  const url = `http://localhost:3000/${type}s`;
  let items: (Album | Cd | Track)[] = [];

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorMessage = response.text();
      throw new Error(`Server response: ${errorMessage}`);
    }
    const data = await response.json();
    data.forEach((item: Album | Cd | Track) => {
      items.push(item);
    });
    return items;
  } catch (error) {
    setError(`Get items: ${error}`);
  }
}
