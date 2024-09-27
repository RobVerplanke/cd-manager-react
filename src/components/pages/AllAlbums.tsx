import { useData } from '../../context/DataContext';
import { Album } from '../../lib/types/types';
import RenderVerticalCardProps from '../cards/RenderVerticalCard';

function AllAlbumsPage() {
  const allAlbums = useData()?.allAlbums;

  return (
    <main className="my-6 pl-6">
      <span className="text-3xl">An overview of your albums</span>
      <div className="py-8 pl-6">
        <ul>
          {allAlbums?.map((album: Album) => (
            <RenderVerticalCardProps key={album.id} item={album} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AllAlbumsPage;
