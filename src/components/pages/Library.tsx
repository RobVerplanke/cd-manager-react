import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Album, Cd, ItemType, Track } from '../../lib/types/types';
import { useData } from '../../context/DataContext';
import { ItemsListContent } from '../content/ItemsListContent';
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
  let { allAlbums, allCds, allTracks } = useData();

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
  const [isAmountSortedDescendingly, setIsAmountSortedDescendingly] =
    useState<boolean>(false);
  const [isRatingSortedDescendingly, setIsRatingSortedDescendingly] =
    useState<boolean>(false);

  useEffect(() => {
    if (itemCategory === 'album') {
      allItems = allAlbums;
    } else if (itemCategory === 'cd') {
      allItems = allCds;
    } else if (itemCategory === 'track') {
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
    setIsAmountSortedDescendingly(false);
    setIsRatingSortedDescendingly(false);

    // Then change the the direction of the active category
    if (targetButton === 'title') {
      setIsTitleSortedDescendingly(!isTitleSortedDescendingly);
    } else if (targetButton === 'length') {
      setIsLengthSortedDescendingly(!isLengthSortedDescendingly);
    } else if (targetButton === 'amount') {
      setIsAmountSortedDescendingly(!isAmountSortedDescendingly);
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

  // Sort the tracks on amoutn of CDs
  function handleClickAmountSort(
    e: React.MouseEvent<HTMLButtonElement>,
    itemType: ItemType
  ) {
    if (!setSortedItems) return;
    setSortedItems(
      (prevVal: (Album | Cd | Track)[]) =>
        sortItemsByAmount(
          prevVal as (Album | Cd)[],
          isAmountSortedDescendingly,
          itemCategory as ItemType
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
              {itemCategory === 'track' ? (
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
                  aria-label="Sort tracks by amount of CDs"
                  className="text-sm font-semibold"
                  onClick={(e) =>
                    handleClickAmountSort(e, itemCategory as ItemType)
                  }
                  data-sort-type="amount"
                >
                  CDs
                  {isAmountSortedDescendingly ? (
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
              {itemCategory === 'track' && (
                <ItemsListContent items={sortedItems as Track[]} />
              )}
              {itemCategory === 'album' && (
                <ItemsListContent items={sortedItems as Album[]} />
              )}
              {itemCategory === 'cd' && (
                <ItemsListContent items={sortedItems as Cd[]} />
              )}
            </>
          )}
        </ul>
      </div>
    </main>
  );
}

export default LibraryPage;
