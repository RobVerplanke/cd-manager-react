import { Cd } from '../../types/types';
import { useData } from '../../context/DataContext';

function AllCdsPage() {
  const allAlbums = useData()?.allCds;

  return (
    <main>
      <h1>List of all cd's</h1>
      <div className="all-items-container">
        <ul>
          {allAlbums?.map((cd: Cd) => (
            <li key={cd.title}>{cd.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AllCdsPage;
