import ReactPaginate from 'react-paginate'; // for pagination
import { useEffect, useState } from 'react'; // useState for storing data and useEffect for changing data on click
import { Album, Cd, Track } from '../../lib/types/types';
import ItemCard from '../cards/ItemCard';
import ItemWithCoverCard from '../cards/ItemWithCoverCard';
import { MAX_AMOUNT_TRACKS_PER_PAGE } from '../../lib/types/constants';

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
  function isTrack(item: Album | Cd | Track): item is Track {
    return (item as Track).specificFields.track.length !== '';
  }

  function isAlbumOrCd(item: Album | Cd | Track): item is Album | Cd {
    return (
      (item as Album).specificFields.album.cdCount !== 0 ||
      (item as Cd).specificFields.cd.cdCount !== 0
    );
  }
  return (
    <>
      <ul>
        {filterData &&
          filterData.map((item) => (
            <li key={item.id}>
              {isTrack(item) && <ItemCard item={item} />}
              {isAlbumOrCd(item) && <ItemWithCoverCard item={item} />}
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
