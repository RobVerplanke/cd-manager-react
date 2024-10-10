import CategorySelector from '../CategorySelector';
import SearchResultContent from '../content/SearchResultContent';
import { Album, Cd, Track, ItemType, Tag } from '../../lib/types/types';
import { useEffect, useRef, useState } from 'react';
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
    // Fetch all albums
    const albums = await getAllAlbums();
    const cds = await getAllCDs();
    const tracks = await getAllTracks();

    // Find items with selected keyword in their tags list
    setFilteredAlbums(
      albums.filter((album) => {
        if (album.tags.includes(tag as string)) return album; // When keyword is found, store the item
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

  useEffect(() => {
    executeSearch();
  }, [tag]);

  // useEffect(() => {

  // }, [tag])

  return (
    <main className="my-6 pl-6">
      <div className="text-3xl">
        <span>Items with tag {tag}</span>
      </div>
      <CategorySelector
        selectedCategory={selectedCategory as string}
        setSelectedCategory={setSelectedCategory}
      />
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
