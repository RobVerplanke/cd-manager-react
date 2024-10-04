import CategorySelector from '../CategorySelector';
import SearchIcon from '@mui/icons-material/Search';
import SearchResultContent from '../content/SearchResultContent';
import getAllItemsFromType from '../../api/getAllItemsFromType';
import { Album, Cd, Track, ItemType } from '../../lib/types/types';
import { useRef, useState } from 'react';

function SearchItemPage() {
  // Use a state to keep track of active radiobutton
  const [selectedCategory, setSelectedCategory] = useState<ItemType>('album');

  // This state of the selected category is used when search button is clicked and the result headings/sort
  //buttons need to be updated
  const [searchForCategory, setSearchForCategory] = useState<ItemType>('album');

  // Control the search input element
  const [searchInput, setSearchInput] = useState('');

  // Data for search results
  const [filteredData, setFilteredData] = useState<(Album | Cd | Track)[]>([]);

  // Show results only when the search buttons is clicked
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  // To control the search input element
  const searchKeyword = useRef<HTMLInputElement | null>(null);

  // Make the selected category definitive and update the search results
  async function executeSearch() {
    setIsSearchButtonClicked(true);

    // Definitive search keyword(s) is set after user clicks/presses enter to submit search
    setSearchForCategory(selectedCategory);

    // Fetch data from selected category only
    const data = await getAllItemsFromType(selectedCategory);

    // Find items with keyword(s) in title or artistname
    setFilteredData(
      data.filter((item) => {
        if (
          item.title.includes(searchInput) ||
          item.artist.includes(searchInput)
        )
          return item; // When keyword is found, store the item in search results
      })
    );
  }

  // Control the search input element
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput((prevVal) => (prevVal = e.target.value));
  }

  // When user clicks the search button, execute search
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    await executeSearch();
  }

  // When user presses the "Enter" key, execute search
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch();
    }
  }

  return (
    <main className="my-6 pl-6">
      <div className="text-3xl">
        <span>Search</span>
      </div>
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="pl-6">
        <input
          ref={searchKeyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
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
