import { Track } from '../../lib/types/types';
import { useData } from '../../context/DataContext';
import RenderHorizontalCard from '../cards/RenderHorizontalCard';

function AllTracksPage() {
  const allTracks = useData()?.allTracks;

  return (
    <main className="my-6 pl-6">
      <span className="text-3xl">An overview of your tracks</span>
      <div className="py-8 pl-6">
        <ul>
          {allTracks?.map((track: Track) => (
            <RenderHorizontalCard key={track.id} item={track} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AllTracksPage;
