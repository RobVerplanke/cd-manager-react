import { ItemType } from '../lib/types/types';

// Generate a selection section where the user can select the preferred category
function CategorySelector({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ItemType>>;
}) {
  return (
    <div className="py-8 pl-6">
      <span className="text-sm font-semibold">Select category:</span>
      <div role="menu" className="flex flex-col gap-1 mt-2 text-[13px]">
        <div>
          <input
            className="mr-2"
            type="radio"
            name="category"
            id="album"
            onChange={() => setSelectedCategory('album')}
            checked={selectedCategory === 'album'}
          />
          <label htmlFor="album">Album</label>
        </div>
        <div>
          <input
            className="mr-2"
            type="radio"
            name="category"
            id="cd"
            onChange={() => setSelectedCategory('cd')}
            checked={selectedCategory === 'cd'}
          />
          <label htmlFor="cd">CD</label>
        </div>
        <div>
          <input
            className="mr-2"
            type="radio"
            name="category"
            id="track"
            onChange={() => setSelectedCategory('track')}
            checked={selectedCategory === 'track'}
          />
          <label htmlFor="track">Track</label>
        </div>
      </div>
    </div>
  );
}

export default CategorySelector;
