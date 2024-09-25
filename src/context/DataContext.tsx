import { useState, useContext, useEffect } from 'react';
import { createContext } from 'react';
import getAllItemsFromType from '../api/getAllItemsFromType';

// Import needed custom types
import {
  type Context,
  type DataProviderProps,
  type Album,
  type Cd,
  type Track,
} from '../lib/types/types';

const DataContext = createContext<Context | null>(null);

export function DataProvider({ children }: DataProviderProps) {
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [allCds, setAllCds] = useState<Cd[]>([]);
  const [allTracks, setAllTracks] = useState<Track[]>([]);

  // Initially wait for and load data
  useEffect(() => {
    const fetchData = async () => {
      const albums = (await getAllItemsFromType('album')) as Album[];
      const cds = (await getAllItemsFromType('cd')) as Cd[];
      const tracks = (await getAllItemsFromType('track')) as Track[];

      // After fetching, set the states with the received data
      setAllAlbums(albums);
      setAllCds(cds);
      setAllTracks(tracks);
    };

    // Initially load all data when the component mounts
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
