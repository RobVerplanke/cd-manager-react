import { useData } from '../../context/DataContext';
import { MAX_BEST_RATED_ITEMS } from '../../lib/constants';
import { Item, type Album, type Cd, type Track } from '../../lib/types/types';
import { getBestAlbums } from '../../utils/helperFunctions';
import ItemCard from '../cards/ItemCard';
import ItemWithCoverCard from '../cards/ItemWithCoverCard';
import StatisticsTable from '../content/StatisticsTable';

function BrowseItemsPage() {
  // Get acces to all items
  const { allAlbums, allCds, allTracks } = useData();

  // Filter all the best rated items for each category
  const bestAlbums: Item[] = getBestAlbums(allAlbums, MAX_BEST_RATED_ITEMS);
  const bestCds: Item[] = getBestAlbums(allCds, MAX_BEST_RATED_ITEMS);
  const bestTracks: Item[] = getBestAlbums(allTracks, MAX_BEST_RATED_ITEMS);

  return (
    <main className="my-5 pl-6 ">
      <div className="text-2xl mb-4 border-b-2 border-[#176061] pb-4">
        <span>Library overview</span>
      </div>

      {/* stats */}
      <div className="mt-8">
        <StatisticsTable />
      </div>

      {/* Best rated albums */}
      <div className="mt-20 py-6">
        <p className="text-xl pb-1 mb-2 border-b-2 border-[#48CFCB]">
          Best rated albums
        </p>
        {bestAlbums ? (
          bestAlbums.map((album) => (
            <ItemWithCoverCard key={album.id} item={album as Album} />
          ))
        ) : (
          <div className="m-8">Loading data...</div>
        )}
      </div>

      {/* Best rated cds */}
      <div className="mt-6 pb-6">
        <p className="text-xl pb-1 mb-2 border-b-2 border-[#48CFCB]">
          Best rated cds
        </p>
        {bestCds ? (
          bestCds.map((cd) => <ItemWithCoverCard key={cd.id} item={cd as Cd} />)
        ) : (
          <div className="m-8">Loading data...</div>
        )}
      </div>

      {/* Best rated tracks */}
      <div className="my-6 pb-6">
        <p className="text-xl pb-1 mb-2 border-b-2 border-[#48CFCB]">
          Best rated tracks
        </p>
        {bestCds ? (
          bestTracks.map((track) => (
            <ItemCard key={track.id} item={track as Track} />
          ))
        ) : (
          <div className="m-8">Loading data...</div>
        )}
      </div>
    </main>
  );
}

export default BrowseItemsPage;
