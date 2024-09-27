import { Cd } from '../../lib/types/types';
import { useData } from '../../context/DataContext';
import RenderVerticalCardProps from '../cards/RenderVerticalCard';

function AllCdsPage() {
  const allCds = useData()?.allCds;

  return (
    <main className="my-6 pl-6">
      <span className="text-3xl">An overview of your CDs</span>
      <div className="py-8 pl-6">
        <ul>
          {allCds?.map((cd: Cd) => (
            <RenderVerticalCardProps key={cd.id} item={cd} />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AllCdsPage;
