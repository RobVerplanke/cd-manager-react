import { Cd } from '../lib/types/types';

// Receive and return all cds
export default async function getAllCDs() {
  const url = `http://localhost:3000/cds`;
  const response = await fetch(url);
  const data = await response.json();
  return data as Cd[];
}
