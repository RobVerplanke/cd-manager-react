import CategorySelector from '../CategorySelector';
import SearchResultContent from '../content/SearchResultContent';
import {
  type Album,
  type Cd,
  type Track,
  type ItemType,
} from '../../lib/types/types';
import { useEffect, useState } from 'react';
import getAllAlbums from '../../api/getAllAlbums';
import getAllCDs from '../../api/getAllCDs';
import getAllTracks from '../../api/getAllTracks';
import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';

function TagSelectionPage() {
  const { tag } = useParams();
  const { setError } = useData();

  // Keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState<ItemType>('album');

  // Storage for the search results
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [filteredCDs, setFilteredCDs] = useState<Cd[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);

  // Retreive all data and filter all items with the corresponding tag
  async function executeSearch() {
    // Fetch all items
    const albums = await getAllAlbums(setError);
    const cds = await getAllCDs(setError);
    const tracks = await getAllTracks(setError);

    // Find items with the selected keyword in its tags list
    albums &&
      setFilteredAlbums(
        albums.filter((album) => {
          if (album.tags.includes(tag as string)) return album;
        })
      );

    cds &&
      setFilteredCDs(
        cds.filter((cd) => {
          if (cd.tags.includes(tag as string)) return cd;
        })
      );

    tracks &&
      setFilteredTracks(
        tracks.filter((track) => {
          if (track.tags.includes(tag as string)) return track;
        })
      );
  }

  // Keep the results up-to-date when user clicks on a tag in one of the items on the results page
  useEffect(() => {
    executeSearch();
  }, [tag]);

  return (
    <main className="my-5 pl-6">
      <div className="text-2xl border-b-2 border-[#176061] pb-4 mb-4">
        <span>Items with tag: {tag}</span>

        {/* User can select the category of the items that should be displayed */}
      </div>
      <CategorySelector
        selectedCategory={selectedCategory as string}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Conditionally render the corresponding items in the results section */}
      <div>
        <SearchResultContent
          category={selectedCategory}
          filteredData={
            selectedCategory === 'album'
              ? filteredAlbums
              : selectedCategory === 'cd'
              ? filteredCDs
              : filteredTracks
          }
        />
      </div>
    </main>
  );
}

export default TagSelectionPage;
