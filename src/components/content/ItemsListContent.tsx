import ReactPaginate from 'react-paginate'; // for pagination
import { useEffect, useState } from 'react'; // useState for storing data and useEffect for changing data on click
import { type Album, type Cd, type Track } from '../../lib/types/types';
import ItemCard from '../cards/ItemCard';
import ItemWithCoverCard from '../cards/ItemWithCoverCard';
import { MAX_AMOUNT_TRACKS_PER_PAGE } from '../../lib/constants';

export function ItemsListContent({
  items,
}: {
  items: Album[] | Cd[] | Track[];
}) {
  const data = items;

  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<(Album | Cd | Track)[]>();
  const n = MAX_AMOUNT_TRACKS_PER_PAGE;

  // When user sorts the data, update the displayed data
  useEffect(() => {
    setFilterData(data);
  }, [data]);

  // Update filtered data based on the current page and items per page
  useEffect(() => {
    const filtered = data.filter((item, index) => {
      return index >= page * n && index < (page + 1) * n;
    });
    setFilterData(filtered);
  }, [page, data]);

  // Type guards for narrowing the item types
  function isAlbum(item: Album | Cd | Track): item is Album {
    return (item as Album).type === 'album';
  }

  function isCd(item: Album | Cd | Track): item is Cd {
    return (item as Cd).type == 'cd';
  }

  function isTrack(item: Album | Cd | Track): item is Track {
    return (item as Track).type === 'track';
  }

  return (
    <>
      <ul>
        {filterData &&
          filterData.map((item) => (
            <li key={item.id}>
              {isTrack(item) && <ItemCard item={item} />}
              {(isAlbum(item) || isCd(item)) && (
                <ItemWithCoverCard item={item} />
              )}
            </li>
          ))}
      </ul>
      <ReactPaginate
        className="flex justify-center gap-2 mt-4"
        containerClassName="flex items-center space-x-2"
        pageClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
        activeClassName="bg-blue-500 text-white border-blue-500"
        previousClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
        nextClassName="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200"
        disabledClassName="opacity-50 cursor-not-allowed"
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(data.length / n)}
        breakLabel="..."
        previousLabel="<-"
        nextLabel="->"
      />
    </>
  );
}
