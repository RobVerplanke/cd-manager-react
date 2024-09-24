import { Track } from '../../types/types';
import { useData } from '../../context/DataContext';

function AllTracksPage() {
  const allAlbums = useData()?.allTracks;

  return (
    <main>
      <h1>List of all cd's</h1>
      <div className="all-items-container">
        <ul>
          {allAlbums?.map((track: Track) => (
            <li key={track.title}>{track.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AllTracksPage;
