import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Album, type Cd, type Track } from '../../lib/types/types';
import SortWithItems from '../SortWithItems';
import { useData } from '../../context/DataContext';

function LibraryPage() {
  // itemCategory can be 'album', 'cd', or 'track'
  const { itemCategory } = useParams<{ itemCategory: string }>();

  // Items to be sorted
  const [sortedItems, setSortedItems] = useState<(Album | Cd | Track)[]>();

  // Collect all data
  let { allAlbums, allCds, allTracks } = useData();

  // Create one items list with corresponding category
  let allItems: (Album | Cd | Track)[] = [];

  // If the user changes the category, update the data directly
  useEffect(() => {
    switch (itemCategory) {
      case 'album':
        allItems = allAlbums;
        break;
      case 'cd':
        allItems = allCds;
        break;
      case 'track':
        allItems = allTracks;
        break;
    }

    // Update state
    allItems && setSortedItems(allItems);
  }, [itemCategory]);

  // Initialize new array on mount
  useEffect(() => {
    allItems && setSortedItems(allItems);
  }, []);

  return (
    <main className="my-5 pl-6">
      <div className="text-2xl border-b-2 border-[#176061] pb-4">
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
