import { Cd } from '../../lib/types/types';
import { useData } from '../../context/DataContext';

function AllCdsPage() {
  const allCds = useData()?.allCds;

  return (
    <main>
      <h1>List of all cds</h1>
      <div className="all-items-container">
        <ul>
          {allCds?.map((cd: Cd) => (
            <li key={cd.title}>{cd.title}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AllCdsPage;
