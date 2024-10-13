import CategorySelector from '../CategorySelector';
import SearchIcon from '@mui/icons-material/Search';
import SearchResultContent from '../content/SearchResultContent';
import getAllItemsFromType from '../../api/getAllItemsFromType';
import { Album, Cd, Track, ItemType, Item } from '../../lib/types/types';
import { useRef, useState } from 'react';
import { useData } from '../../context/DataContext';

function SearchItemPage() {
  const { setError } = useData();
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

  // Check whether the tags list contains the keyword
  function isKeywordInTags(item: Item, keyword: string) {
    return item.tags.find((tag) =>
      tag.toUpperCase().includes(keyword.toUpperCase())
    );
  }

  // Make search case insensitive
  function compareCaseInsensitive(item: Item, keyword: string) {
    return (
      item.title.toUpperCase().includes(keyword.toUpperCase()) ||
      item.artist.toUpperCase().includes(keyword.toUpperCase())
    );
  }

  // Make the selected category definitive and update the search results
  async function executeSearch() {
    // Update search button state
    setIsSearchButtonClicked(true);

    // Definitive search keyword(s) is set after user clicks/presses enter to submit search
    setSearchForCategory(selectedCategory);

    // Fetch data from selected category only
    const data = await getAllItemsFromType(selectedCategory, setError);

    // Find items with keyword(s) in title, artistname or its tags
    if (data)
      setFilteredData(
        data.filter((item) => {
          if (
            compareCaseInsensitive(item, searchInput) ||
            isKeywordInTags(item, searchInput)
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
      {/* Render section where category can be selected */}
      <CategorySelector
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {/* Searchbar */}
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
        {/* Search results */}
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
