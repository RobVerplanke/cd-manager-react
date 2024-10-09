import { Item, ItemType } from '../lib/types/types';

// Receive and return a list which contains objects of the corresponding item type
export default async function EditItem(type: ItemType, item: Item) {
  const url = `http://localhost:3000/${type}s/${item.id}`;

  await fetch(url, {
    headers: { 'Content-type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(item),
  });
}
