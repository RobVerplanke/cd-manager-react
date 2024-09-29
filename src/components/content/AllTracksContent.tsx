import { Track } from '../../lib/types/types';
import RenderHorizontalCard from '../cards/RenderHorizontalCard';

export function AllTracksContent({ tracks }: { tracks: Track[] }) {
  let currentPage = 1;

  return (
    <div className="flex flex-col">
      <ul>
        {tracks?.map((track: Track) => (
          <li key={track.id}>
            <RenderHorizontalCard item={track} />
          </li>
        ))}
      </ul>
      <div className="flex items-center self-center pt-2">
        <div className="text-4xl pr-4">{`<-`}</div>
        <div className="text-lg">{`1/3`}</div>
        <div className="text-4xl pl-4">{`->`}</div>
      </div>
    </div>
  );
}
