import { Album } from '../../types/types';
import { useData } from '../../context/DataContext';

function AllAlbumsPage() {
  const allAlbums = useData()?.allAlbums;

  return (
    <main>
      <h1>List of all albums</h1>
      <div className="all-items-container">
        <ul>
          {allAlbums?.map((album: Album) => (
            <li key={album.title}>{album.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AllAlbumsPage;
