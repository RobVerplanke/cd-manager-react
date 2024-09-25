import { useState, useContext, useEffect } from 'react';
import { createContext } from 'react';
import getAllItemsFromType from '../api/getAllItemsFromType';

// Import custom types
import {
  type Context,
  type DataProviderProps,
  type Album,
  type Cd,
  type Track,
} from '../lib/types/types';

// Create the context
const DataContext = createContext<Context | null>(null);

// Manage the state
export function DataProvider({ children }: DataProviderProps) {
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [allCds, setAllCds] = useState<Cd[]>([]);
  const [allTracks, setAllTracks] = useState<Track[]>([]);

  // Initially wait for data and put all items in their corresponding state
  useEffect(() => {
    const fetchData = async () => {
      const albums = (await getAllItemsFromType('album')) as Album[];
      const cds = (await getAllItemsFromType('cd')) as Cd[];
      const tracks = (await getAllItemsFromType('track')) as Track[];

      // Set the states
      setAllAlbums(albums);
      setAllCds(cds);
      setAllTracks(tracks);
    };

    // Load all data when the component mounts
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ allAlbums, allCds, allTracks }}>
      {children}
    </DataContext.Provider>
  );
}

// Used for easy acces to the data
export function useData() {
  return useContext(DataContext);
}
