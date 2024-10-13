import { useData } from '../context/DataContext';
import { Item, ItemType } from '../lib/types/types';

// Receive and return a list which contains objects of the corresponding item type
export default async function DeleteItem(
  type: ItemType,
  item: Item,
  setError: (message: string) => void
) {
  const url = `http://localhost:3000/${type}s/${item.id}`;

  try {
    const response = await fetch(url, {
      headers: { 'Content-type': 'application/json' },
      method: 'DELETE',
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Server response: ${errorMessage}`);
    }
  } catch (error) {
    setError(`Delete item: ${error}`);
  }
}
