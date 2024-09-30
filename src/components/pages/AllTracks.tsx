import { useEffect, useState } from 'react';
import { Track } from '../../lib/types/types';
import { useData } from '../../context/DataContext';
import { LibraryContent } from '../content/LibraryContent';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  sortItemsByTitle,
  sortItemsByLength,
  sortItemsByRating,
} from '../../utils/helperFunctions';

function AllTracksPage() {
  const allTracks = useData()?.allTracks;

  // Create a seperate list of the sorted tracks to prevent possible interference in other components
  // where a list of tracks is needed
  const [sortedTracks, setSortedTracks] = useState<Track[]>(
    allTracks ? allTracks : []
  );

  const [isTitleSortedDescendingly, setIsTitleSortedDescendingly] =
    useState<boolean>(false);
  const [isLengthSortedDescendingly, setIsLengthSortedDescendingly] =
    useState<boolean>(false);
  const [isRatingSortedDescendingly, setIsRatingSortedDescendingly] =
    useState<boolean>(false);

  // Initialize new array on mount
  useEffect(() => {
    if (allTracks) setSortedTracks(allTracks);
  }, []);

  // Change the direction of the sorting arrows in the correct direction, depending on which category is active
  // Reset all buttons at once because of when taking the amount of buttons in account, this has a low influence on the performence
  // Otherwise it's needed to change the directions of the previous and active category only
  function setArrowsDirection(e: React.MouseEvent<HTMLButtonElement>) {
    const targetButton = e.currentTarget.dataset.sortType;

    // First reset all buttons to downward direction
    setIsTitleSortedDescendingly(false);
    setIsLengthSortedDescendingly(false);
    setIsRatingSortedDescendingly(false);

    // Then change the the direction of the active category
    if (targetButton === 'title') {
      setIsTitleSortedDescendingly(!isTitleSortedDescendingly);
    } else if (targetButton === 'length') {
      setIsLengthSortedDescendingly(!isLengthSortedDescendingly);
    } else {
      setIsRatingSortedDescendingly(!isRatingSortedDescendingly);
    }
  }

  // Sort the tracks alphabetically
  function handleClickTitleSort(e: React.MouseEvent<HTMLButtonElement>) {
    if (!setSortedTracks) return;
    setSortedTracks(
      (prevVal: Track[]) =>
        sortItemsByTitle(prevVal, isTitleSortedDescendingly) as Track[]
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  // Sort the tracks on longest track length
  function handleClickLengthSort(e: React.MouseEvent<HTMLButtonElement>) {
    if (!setSortedTracks) return;
    setSortedTracks((prevVal: Track[]) =>
      sortItemsByLength(prevVal, isLengthSortedDescendingly)
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  // Sort the tracks on highest rating
  function handleClickRatingSort(e: React.MouseEvent<HTMLButtonElement>) {
    if (!setSortedTracks) return;
    setSortedTracks(
      (prevVal: Track[]) =>
        sortItemsByRating(prevVal, isRatingSortedDescendingly) as Track[]
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  return (
    <main className="my-6 pl-6">
      <span className="text-3xl">An overview of your tracks</span>
      <div className="py-8 pl-6">
        <ul>
          <div className="grid grid-cols-[1fr_90px_100px_1fr] gap-2 items-center py-2 border-b">
            <div>
              <button
                aria-label="Sort tracks alphabetically"
                className="text-sm font-semibold"
                onClick={handleClickTitleSort}
                data-sort-type="title"
              >
                Name
                {isTitleSortedDescendingly ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </button>
            </div>
            <div>
              <button
                aria-label="Sort tracks by length"
                className="text-sm font-semibold"
                onClick={handleClickLengthSort}
                data-sort-type="length"
              >
                Length
                {isLengthSortedDescendingly ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </button>
            </div>
            <div>
              <button
                aria-label="Sort tracks by rating"
                className="text-sm font-semibold"
                onClick={handleClickRatingSort}
                data-sort-type="rating"
              >
                Rating
                {isRatingSortedDescendingly ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </button>
            </div>
            <div>
              <span className="text-sm font-semibold">Tags</span>
            </div>
          </div>
          {allTracks && <LibraryContent items={sortedTracks} />}
        </ul>
      </div>
    </main>
  );
}

export default AllTracksPage;
