import { ItemType, Album, Cd, Track } from '../lib/types/types';

export default async function getAllItemsFromType(type: ItemType) {
  let items: Album[] | Cd[] | Track[] = [];
  const url = `http://localhost:3000/${type}s`;
  const response = await fetch(url);
  const data = await response.json();

  data.forEach((item: Album | Cd | Track): void => {
    items.push(item);
  });
  return items;
}
