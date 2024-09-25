import { ItemType, Album, Cd, Track } from '../lib/types/types';

// Receive and return a list which contains objects of the corresponding item type
export default async function getAllItemsFromType(type: ItemType) {
  // The items array can only contain objects from these types
  let items: (Album | Cd | Track)[] = [];

  // Get all objects with the corresponding type
  const url = `http://localhost:3000/${type}s`;
  const response = await fetch(url);
  const data = await response.json();

  // Iterate through received data and store the objects
  data.forEach((item: Album | Cd | Track) => {
    items.push(item);
  });
  return items;
}
