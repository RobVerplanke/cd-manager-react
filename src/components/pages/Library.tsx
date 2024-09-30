import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Album, Cd, Track } from '../../lib/types/types';
import { useData } from '../../context/DataContext';
import { LibraryContent } from '../content/LibraryContent';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  sortItemsByTitle,
  sortItemsByLength,
  sortItemsByAmount,
  sortItemsByRating,
} from '../../utils/helperFunctions';

function LibraryPage() {
  // itemCategory can be 'albums', 'cds', or 'tracks'
  const { itemCategory } = useParams<{ itemCategory: string }>();

  // Collect all data
  const { allAlbums, allCds, allTracks } = useData();

  // Create one items list with corresponding category
  let allItems: (Album | Cd | Track)[] = [];

  // Create a seperate list of the sorted tracks to prevent possible interference in other components
  // where a list of tracks is needed
  const [sortedItems, setSortedItems] = useState<(Album | Cd | Track)[]>(
    allItems ? allItems : []
  );

  const [isTitleSortedDescendingly, setIsTitleSortedDescendingly] =
    useState<boolean>(false);
  const [isLengthSortedDescendingly, setIsLengthSortedDescendingly] =
    useState<boolean>(false);
  const [isRatingSortedDescendingly, setIsRatingSortedDescendingly] =
    useState<boolean>(false);

  useEffect(() => {
    if (itemCategory === 'albums') {
      allItems = allAlbums;
    } else if (itemCategory === 'cds') {
      allItems = allCds;
    } else if (itemCategory === 'tracks') {
      allItems = allTracks;
    }

    if (allItems) {
      setSortedItems(allItems);
    }
  }, [itemCategory]);

  // Initialize new array on mount
  useEffect(() => {
    if (allItems) setSortedItems(allItems);
  }, []);

  // Change the direction of the sorting arrows in the correct direction, depending on which category is active
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
    if (!setSortedItems) return;
    setSortedItems((prevVal: (Album | Cd | Track)[]) =>
      sortItemsByTitle(prevVal, isTitleSortedDescendingly)
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  // Sort the tracks on longest track length
  function handleClickLengthSort(e: React.MouseEvent<HTMLButtonElement>) {
    if (!setSortedItems) return;
    setSortedItems(
      (prevVal: (Album | Cd | Track)[]) =>
        sortItemsByLength(prevVal as Track[], isLengthSortedDescendingly) as (
          | Album
          | Cd
          | Track
        )[]
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  // Sort the tracks on longest track length
  function handleClickAmountSort(e: React.MouseEvent<HTMLButtonElement>) {
    if (!setSortedItems) return;
    setSortedItems(
      (prevVal: (Album | Cd | Track)[]) =>
        sortItemsByAmount(
          prevVal as (Album | Cd)[],
          isLengthSortedDescendingly
        ) as (Album | Cd)[]
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  // Sort the tracks on highest rating
  function handleClickRatingSort(e: React.MouseEvent<HTMLButtonElement>) {
    if (!setSortedItems) return;
    setSortedItems(
      (prevVal: (Album | Cd | Track)[]) =>
        sortItemsByRating(
          prevVal as (Album | Cd)[],
          isRatingSortedDescendingly
        ) as (Album | Cd)[]
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  return (
    <main className="my-6 pl-6">
      <span className="text-3xl">An overview of your {itemCategory}</span>
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
              {/* Display a "Length" sorting button for tracks or a "CDs" button for albums and cds */}
              {itemCategory === 'tracks' ? (
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
              ) : (
                <button
                  aria-label="Sort tracks by length"
                  className="text-sm font-semibold"
                  onClick={handleClickAmountSort}
                  data-sort-type="length"
                >
                  CDs
                  {isLengthSortedDescendingly ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </button>
              )}
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
          {allItems && (
            <>
              {itemCategory === 'tracks' && (
                <LibraryContent items={sortedItems as Track[]} />
              )}
              {itemCategory === 'albums' && (
                <LibraryContent items={sortedItems as Album[]} />
              )}
              {itemCategory === 'cds' && (
                <LibraryContent items={sortedItems as Cd[]} />
              )}
            </>
          )}
        </ul>
      </div>
    </main>
  );
}

export default LibraryPage;
