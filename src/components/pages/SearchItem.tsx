import SearchIcon from '@mui/icons-material/Search';
import SearchResultContent from '../content/SearchResultContent';
import getAllItemsFromType from '../../api/getAllItemsFromType';
import { Album, Cd, Track, ItemType } from '../../lib/types/types';
import { useRef, useState } from 'react';

function SearchItemPage() {
  // Use a state to keep track of active radiobutton
  const [seletedCategory, setSelectedCategory] = useState<ItemType>('album');

  // This state of the selected category is used when search button is clicked and the result headings/sort
  //buttons need to be updated
  const [searchForCategory, setSearchForCategory] = useState<ItemType>('album');

  // Control the search input field
  const [searchInput, setSearchInput] = useState('');

  // Search results
  const [filteredData, setFilteredData] = useState<(Album | Cd | Track)[]>([]);

  // Show results only when the search buttons is clicked
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  const searchKeyword = useRef<HTMLInputElement | null>(null);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsSearchButtonClicked(true);
    setSearchForCategory(seletedCategory);

    const data = await getAllItemsFromType(seletedCategory);

    // Find items with keyword in title or artistname
    setFilteredData(
      data.filter((item) => {
        if (
          item.title.includes(searchInput) ||
          item.artist.includes(searchInput)
        )
          return item;
      })
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput((prevVal) => (prevVal = e.target.value));
  }

  return (
    <main className="my-6 pl-6">
      <div className="text-3xl">
        <span>Search</span>
      </div>
      <div className="py-8 pl-6">
        <span className="text-sm font-semibold">Select category:</span>
        <div role="menu" className="flex flex-col gap-1 mt-2 text-[13px]">
          <div>
            <input
              className="mr-2"
              type="radio"
              name="category"
              id="album"
              onClick={() => setSelectedCategory('album')}
            />
            <label htmlFor="album">Album</label>
          </div>
          <div>
            <input
              className="mr-2"
              type="radio"
              name="category"
              id="cd"
              onClick={() => setSelectedCategory('cd')}
            />
            <label htmlFor="cd">CD</label>
          </div>
          <div>
            <input
              className="mr-2"
              type="radio"
              name="category"
              id="track"
              onClick={() => setSelectedCategory('track')}
            />
            <label htmlFor="track">Track</label>
          </div>
        </div>
      </div>
      <div className="pl-6">
        <input
          ref={searchKeyword}
          onChange={handleChange}
          value={searchInput}
          className="rounded-md h-7 p-2 mr-0.5 w-1/3"
          placeholder="Search for keywords..."
          type="text"
          name="search"
          id="search"
        />
        <button onClick={handleClick}>
          <SearchIcon />
        </button>
      </div>
      <div>
        {isSearchButtonClicked && (
          <SearchResultContent
            category={searchForCategory}
            filteredData={filteredData}
          />
        )}
      </div>
    </main>
  );
}

export default SearchItemPage;
