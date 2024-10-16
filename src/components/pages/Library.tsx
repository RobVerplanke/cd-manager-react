import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Album, Cd, Track } from '../../lib/types/types';

import SortWithItems from '../SortWithItems';
import { useData } from '../../context/DataContext';

function LibraryPage() {
  // itemCategory can be 'album', 'cd', or 'track'
  const { itemCategory } = useParams<{ itemCategory: string }>();
  const [sortedItems, setSortedItems] = useState<(Album | Cd | Track)[]>();

  // Collect all data
  let { allAlbums, allCds, allTracks } = useData();

  // Create one items list with corresponding category
  let allItems: (Album | Cd | Track)[] = [];

  // If the user changes the category, update the data directly
  useEffect(() => {
    if (itemCategory === 'album') {
      allItems = allAlbums;
    } else if (itemCategory === 'cd') {
      allItems = allCds;
    } else if (itemCategory === 'track') {
      allItems = allTracks;
    }

    if (allItems) {
      setSortedItems(allItems);
    }
  }, [itemCategory]);

  // Initialize new array on mount
  useEffect(() => {
    if (allItems) setSortedItems(allItems);
  }, []);

  return (
    <main className="my-6 pl-6">
      <div className="text-xl border-b-2 border-slate-400 pb-4">
        <p>Library - Overview of your {itemCategory}s</p>
      </div>
      <SortWithItems
        filteredData={sortedItems as (Album | Cd | Track)[]}
        itemCategory={itemCategory ? itemCategory : 'unknown'}
      />
    </main>
  );
}

export default LibraryPage;
