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

  // Display results with sorting options
  return (
    <main className="my-16 pl-6">
      {filteredData.length ? (
        <SortWithItems
          filteredData={filteredData as (Album | Cd | Track)[]}
          itemCategory={itemCategory ? itemCategory : 'unknown'}
        />
      ) : (
        <p>No items found...</p>
      )}
    </main>
  );
}

export default SearchResultContent;
