import ReactPaginate from 'react-paginate'; // for pagination
import { useEffect, useState } from 'react'; // useState for storing data and useEffect for changing data on click
import { Album } from '../../lib/types/types';
import ItemWithCoverCard from '../cards/ItemWithCoverCard';
import { MAX_AMOUNT_CDS_PER_PAGE } from '../../lib/types/constants';

export function AllAlbumsContent({ albums }: { albums: Album[] }) {
  const data = albums;

  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<Album[]>();
  const n = MAX_AMOUNT_CDS_PER_PAGE;

  // When user sorts the data, update the displayed data
  useEffect(() => {
    setFilterData(data);
  }, [data]);

  // Code below belongs to the react-paginate module, added 'data' in dependencies array
  useEffect(() => {
    setFilterData(
      data.filter((item, index) => {
        return index >= page * n && index < (page + 1) * n;
      })
    );
  }, [page, data]);

  return (
    <>
      <ul>
        {filterData &&
          filterData.map((item) => (
            <li key={item.id}>
              <ItemWithCoverCard item={item} />
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
