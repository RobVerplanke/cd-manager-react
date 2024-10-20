import { type Album, type Cd, type Track } from '../lib/types/types';

// Receive and return an item with the corresponding ID
export default async function getItemById(
  id: string,
  setError: (message: string) => void
) {
  let items: (Album | Cd | Track)[] = [];
  const types: string[] = ['albums', 'cds', 'tracks'];

  // First collect the data from all types as there is no endpoint to fetch all data at once
  const promises = types.map(async (type) => {
    const url = `http://localhost:3000/${type}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorMessage = response.text();
        throw new Error(`Server response: ${errorMessage}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(`Get items: ${error}`);
    }
  });

  const results = await Promise.all(promises);
  results.forEach((data) => (items = items.concat(data)));

  // Iterate through received data and return the corresponding item
  const selectedItem = items.find((item) => item.id === id);

  return selectedItem;
}
