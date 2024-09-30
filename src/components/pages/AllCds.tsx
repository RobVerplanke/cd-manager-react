import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { Cd } from '../../lib/types/types';
import { AllCdsContent } from '../content/AllCdsContent';
import {
  sortItemsByTitle,
  sortItemsByAmount,
  sortItemsByRating,
} from '../../utils/helperFunctions';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function AllCdsPage() {
  const allCds = useData()?.allCds;

  const [sortedCds, setSortedCds] = useState<Cd[]>(allCds ? allCds : []);

  const [isTitleSortedDescendingly, setIsTitleSortedDescendingly] =
    useState<boolean>(false);
  const [isLengthSortedDescendingly, setIsLengthSortedDescendingly] =
    useState<boolean>(false);
  const [isRatingSortedDescendingly, setIsRatingSortedDescendingly] =
    useState<boolean>(false);

  // Initialize new array on mount
  useEffect(() => {
    if (allCds) setSortedCds(allCds);
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
    if (!setSortedCds) return;
    setSortedCds(
      (prevVal: Cd[]) =>
        sortItemsByTitle(prevVal, isTitleSortedDescendingly) as Cd[]
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  // Sort the tracks on longest track length
  function handleClickAmountSort(e: React.MouseEvent<HTMLButtonElement>) {
    if (!setSortedCds) return;
    setSortedCds(
      (prevVal: Cd[]) =>
        sortItemsByAmount(prevVal, isLengthSortedDescendingly) as Cd[]
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  // Sort the tracks on highest rating
  function handleClickRatingSort(e: React.MouseEvent<HTMLButtonElement>) {
    if (!setSortedCds) return;
    setSortedCds(
      (prevVal: Cd[]) =>
        sortItemsByRating(prevVal, isRatingSortedDescendingly) as Cd[]
    );

    // Set the correct arrow directions
    setArrowsDirection(e);
  }

  return (
    <main className="my-6 pl-6">
      <span className="text-3xl">An overview of your CDs</span>
      <div className="py-8 pl-6">
        <ul>
          <div className="grid grid-cols-[50px_1fr_90px_100px_1fr] gap-2 items-center py-2 border-b">
            <div></div>
            <div>
              <button
                aria-label="Sort CDs alphabetically"
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
                aria-label="Sort CDs by length"
                className="text-sm font-semibold"
                onClick={handleClickAmountSort}
                data-sort-type="length"
              >
                Cds
                {isLengthSortedDescendingly ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </button>
            </div>
            <div>
              <button
                aria-label="Sort CDs by rating"
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
          {allCds && <AllCdsContent cds={sortedCds} />}
        </ul>
      </div>
    </main>
  );
}

export default AllCdsPage;
