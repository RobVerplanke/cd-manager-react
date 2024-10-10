import { useEffect, useState } from 'react';
import { Album, Cd, Track } from '../../lib/types/types';

import SortWithItems from '../SortWithItems';

function SearchResultContent({
  category,
  filteredData,
}: {
  category: string;
  filteredData: (Album | Cd | Track)[];
}) {
  // itemCategory can be 'album', 'cd', or 'track'
  const itemCategory = category;

  const [sortedItems, setSortedItems] = useState<(Album | Cd | Track)[]>(
    filteredData ? filteredData : []
  );

  console.log('sortedItems: ', sortedItems);

  useEffect(() => {
    setSortedItems(filteredData);
  }, [filteredData]);

  return (
    <main className="my-16 pl-6">
      <SortWithItems
        filteredData={sortedItems as (Album | Cd | Track)[]}
        itemCategory={itemCategory ? itemCategory : 'unknown'}
      />
    </main>
  );
}

export default SearchResultContent;
