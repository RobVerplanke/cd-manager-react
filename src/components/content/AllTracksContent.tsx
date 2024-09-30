import ReactPaginate from 'react-paginate'; // for pagination
import { useEffect, useState } from 'react'; // useState for storing data and useEffect for changing data on click
import { Track } from '../../lib/types/types';
import RenderHorizontalCard from '../cards/RenderHorizontalCard';
import { MAX_AMOUNT_TRACKS_PER_PAGE } from '../../lib/types/constants';

export function AllTracksContent({ tracks }: { tracks: Track[] }) {
  const data = tracks;

  const [page, setPage] = useState(0);
  const [filterData, setFilterData] = useState<Track[]>();
  const n = MAX_AMOUNT_TRACKS_PER_PAGE;

  // When user sorts the data, update the displayed data
  useEffect(() => {
    setFilterData(data);
  }, [data]);

  // Code below belongs to the react-paginate module
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
              <RenderHorizontalCard item={item} />
            </li>
          ))}
      </ul>
      <ReactPaginate
        className="flex justify-center gap-4 pt-4 text-lg"
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        activeClassName={'active'}
        onPageChange={(event) => setPage(event.selected)}
        pageCount={Math.ceil(data.length / n)}
        breakLabel="..."
        previousLabel={`<-`}
        nextLabel={`->`}
      />
    </>
  );
}
