import { Item, ItemType } from '../lib/types/types';

// Receive and return a list which contains objects of the corresponding item type
export default async function addNewItem(type: ItemType, item: Item) {
  const url = `http://localhost:3000/${type}s`;

  await fetch(url, {
    headers: { 'Content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(item),
  });

  // Get all objects with the corresponding type
  const response = await fetch(url);
  const data = await response.json();
}
