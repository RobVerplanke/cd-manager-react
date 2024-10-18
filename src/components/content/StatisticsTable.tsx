import { useData } from '../../context/DataContext';

function StatisticsTable() {
  const { allAlbums, allCds, allTracks } = useData();

  // Retreive amount of items per category
  const totalAlbums = allAlbums.length;
  const totalCds = allCds.length;
  const totalTracks = allTracks.length;

  // Calculate statistics for albums
  const avgAlbumRating =
    totalAlbums > 0
      ? (
          allAlbums.reduce((acc, album) => acc + album.rating, 0) / totalAlbums
        ).toFixed(0)
      : 'N/A';

  // Calculate statistics for CDs
  const avgCdRating =
    totalCds > 0
      ? (allCds.reduce((acc, cd) => acc + cd.rating, 0) / totalCds).toFixed(0)
      : 'N/A';

  // Calculate statistics for tracks
  const avgTrackRating =
    totalTracks > 0
      ? (
          allTracks.reduce((acc, track) => acc + track.rating, 0) / totalTracks
        ).toFixed(0)
      : 'N/A';

  const totalTrackDuration =
    totalTracks > 0
      ? allTracks
          .reduce((acc, track) => acc + (parseFloat(track.length) || 0), 0)
          .toFixed(0)
      : 'N/A'; // in minutes

  return (
    <div className="max-w-lg">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b-2 border-[#48CFCB] text-sm">
            <th className="pe-14 py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Average rating</th>
            <th className="py-2 px-4 border-b">Total length (min)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Albums</td>
            <td className="py-2 px-4 border-b text-center">{totalAlbums}</td>
            <td className="py-2 px-4 border-b text-center">{avgAlbumRating}</td>
            <td className="py-2 px-4 border-b text-center">N/A</td>
            {''}
            {/* No length for albums */}
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-bold">CD's</td>
            <td className="py-2 px-4 border-b text-center">{totalCds}</td>
            <td className="py-2 px-4 border-b text-center">{avgCdRating}</td>
            <td className="py-2 px-4 border-b text-center">N/A</td>
            {''}
            {/* No length for cds */}
          </tr>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Tracks</td>
            <td className="py-2 px-4 border-b text-center">{totalTracks}</td>
            <td className="py-2 px-4 border-b text-center">{avgTrackRating}</td>
            <td className="py-2 px-4 border-b text-center">
              {totalTrackDuration}
            </td>
            {''}
            {/* Total length */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StatisticsTable;
