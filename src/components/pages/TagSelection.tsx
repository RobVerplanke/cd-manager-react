import CategorySelector from '../CategorySelector';
import SearchResultContent from '../content/SearchResultContent';
import { Album, Cd, Track, ItemType } from '../../lib/types/types';
import { useEffect, useState } from 'react';
import getAllAlbums from '../../api/getAllAlbums';
import { useParams } from 'react-router-dom';
import getAllCDs from '../../api/getAllCDs';
import getAllTracks from '../../api/getAllTracks';

function TagSelectionPage() {
  const { tag } = useParams();

  const [selectedCategory, setSelectedCategory] = useState<ItemType>('album');

  // Data for search results
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [filteredCDs, setFilteredCDs] = useState<Cd[]>([]);
  const [filteredTracks, setFilteredTracks] = useState<Track[]>([]);

  async function executeSearch() {
    // Fetch all items
    const albums = await getAllAlbums();
    const cds = await getAllCDs();
    const tracks = await getAllTracks();

    // Find items with the selected keyword in its tags list
    setFilteredAlbums(
      albums.filter((album) => {
        if (album.tags.includes(tag as string)) return album;
      })
    );

    setFilteredCDs(
      cds.filter((cd) => {
        if (cd.tags.includes(tag as string)) return cd;
      })
    );

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
    <main className="my-6 pl-6">
      <div className="text-3xl">
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
