import { Track } from '../../lib/types/types';
import { useData } from '../../context/DataContext';

function AllTracksPage() {
  const allTracks = useData()?.allTracks;

  return (
    <main>
      <h1>List of all tracks</h1>
      <div className="all-items-container">
        <ul>
          {allTracks?.map((track: Track) => (
            <li key={track.title}>{track.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AllTracksPage;
