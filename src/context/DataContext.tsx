import { useState, useContext, useEffect } from 'react';
import { createContext } from 'react';
import getAllItemsFromType from '../api/getAllItemsFromType';
import { MESSAGE_TIMEOUT_SECONDS } from '../lib/constants';

// Import custom types
import {
  type Context,
  type DataProviderProps,
  type Album,
  type Cd,
  type Track,
} from '../lib/types/types';

// Create the context
const DataContext = createContext<Context>({
  error: null,
  confirmationMessage: null,
  allAlbums: [],
  allCds: [],
  allTracks: [],
  setConfirmationMessage: () => {},
  setError: () => {},
  setIsItemMutated: () => {},
});

// Manage the state
export function DataProvider({ children }: DataProviderProps) {
  const [error, setError] = useState<string | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [allAlbums, setAllAlbums] = useState<Album[]>([]);
  const [allCds, setAllCds] = useState<Cd[]>([]);
  const [allTracks, setAllTracks] = useState<Track[]>();
  const [isItemMutated, setIsItemMutated] = useState<boolean>(false);

  // Wait for data and put all items in their corresponding state
  const fetchData = async () => {
    try {
      const albums = (await getAllItemsFromType('album', setError)) as Album[];
      const cds = (await getAllItemsFromType('cd', setError)) as Cd[];
      const tracks = (await getAllItemsFromType('track', setError)) as Track[];

      // Set the states
      setAllAlbums(albums);
      setAllCds(cds);
      setAllTracks(tracks);

      // Reset to default, after it was changed to "true" when an item was added or edited
      setIsItemMutated(false);
    } catch (error) {
      setError(`Fetch data went wrong: ${error}`);
    }
  };

  // Load all data when the component mounts and again after the data is mutated by user
  useEffect(() => {
    fetchData();
  }, [isItemMutated]);

  // Reset error message after x amount of seconds (declared in src/lib/constants.ts)
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, MESSAGE_TIMEOUT_SECONDS);
      return () => clearTimeout(timer); // cleanup timer
    }
  }, [error]);

  // Reset confirm message after x amount of seconds (declared in src/lib/constants.ts)
  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage(null);
      }, MESSAGE_TIMEOUT_SECONDS);
      return () => clearTimeout(timer); // cleanup timer
    }
  }, [confirmationMessage]);

  return (
    <DataContext.Provider
      value={{
        error,
        confirmationMessage,
        allAlbums,
        allCds,
        allTracks: allTracks || [],
        setConfirmationMessage,
        setError,
        setIsItemMutated,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

// Used for easy acces to the data
export function useData() {
  return useContext(DataContext);
}
