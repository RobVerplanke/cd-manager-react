import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useEffect, useState } from 'react';
import { Album, Cd, Track, ItemType } from '../lib/types/types';
import {
  sortItemsByTitle,
  sortItemsByLength,
  sortItemsByAmount,
  sortItemsByRating,
} from '../utils/helperFunctions';
import { ItemsListContent } from './content/ItemsListContent';
import { useData } from '../context/DataContext';

// Generate a list of items with sorting options at the top
export default function SortWithItems({
  filteredData,
  itemCategory,
}: {
  filteredData: (Album | Cd | Track)[];
  itemCategory: string;
}) {
  // First collect all items
  let { allAlbums, allCds, allTracks } = useData();

  // A list for the eventual sorted items
  const [sortedItems, setSortedItems] = useState<(Album | Cd | Track)[]>(
    filteredData ? filteredData : []
  );

  // Keep track of how the data is currently sorted
  const [isTitleSortedDescendingly, setIsTitleSortedDescendingly] =
    useState<boolean>(false);
  const [isLengthSortedDescendingly, setIsLengthSortedDescendingly] =
    useState<boolean>(false);
  const [isAmountSortedDescendingly, setIsAmountSortedDescendingly] =
    useState<boolean>(false);
  const [isRatingSortedDescendingly, setIsRatingSortedDescendingly] =
    useState<boolean>(false);

  // Change the direction of the sorting arrows in the correct direction, depending on which category is active
  function setArrowsDirection(e: React.MouseEvent<HTMLButtonElement>) {
    const targetButton = e.currentTarget.dataset.sortType;

    // Reset all buttons to downward direction
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

  // If the user changes the category, update the data directly
  useEffect(() => {
    if (itemCategory === 'album') {
      setSortedItems(allAlbums);
    } else if (itemCategory === 'cd') {
      setSortedItems(allCds);
    } else if (itemCategory === 'track') {
      setSortedItems(allTracks);
    }
  }, [itemCategory]);

  // If the data changes in the tag component (after the user clicked on an other tag) update the displayed data
  useEffect(() => {
    setSortedItems(filteredData);
  }, [filteredData]);

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
    itemType: string
  ) {
    if (!setSortedItems) return;
    setSortedItems(
      (prevVal: (Album | Cd | Track)[]) =>
        sortItemsByAmount(
          prevVal as Album[] | Cd[],
          isAmountSortedDescendingly,
          itemType as ItemType
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
          prevVal as Album[] | Cd[],
          isRatingSortedDescendingly
        ) as (Album | Cd)[]
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  return (
    <div className="py-2 pl-6">
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
                aria-label="Sort tracks by length"
                className="text-sm font-semibold"
                onClick={(e) =>
                  handleClickAmountSort(e, itemCategory as string)
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
        {sortedItems && (
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
  );
}
