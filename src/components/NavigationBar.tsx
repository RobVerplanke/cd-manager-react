import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function NavigationBar() {
  const location = useLocation();

  // Store the state of the accordion nagigation (open/closed)
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  // Visually highlight active button
  function getClassName(page: string) {
    return `flex justify-center items-center h-9 ${
      location.pathname === page ? 'bg-[#359996]' : 'bg-[#176061]'
    } hover:bg-[#48CFCB]`;
  }

  // Toggle accordion menu status
  const handleOpen = () => {
    setAccordionOpen(!isAccordionOpen);
  };

  return (
    <nav className="text-gray-100">
      <Link
        to="/"
        aria-label="Go to Browse page"
        className={getClassName('/')}
        onClick={() => {}}
      >
        Browse
      </Link>
      <Link
        to="/search"
        aria-label="Go to Search page"
        className={getClassName('/search')}
        onClick={() => {}}
      >
        Search
      </Link>

      {/* Accordion start */}
      <div>
        <div
          className="flex justify-end items-center h-9 bg-[#176061] hover:bg-[#48CFCB] w-full"
          onClick={handleOpen}
        >
          <div className="pr-5">
            <button className="" aria-label="Toggle library submenu">
              Library
            </button>
          </div>
          <div className="pr-2">
            {isAccordionOpen ? (
              <ArrowDropUpIcon className="mt-1" />
            ) : (
              <ArrowDropDownIcon className="mt-1" />
            )}
          </div>
        </div>
        {isAccordionOpen && (
          <ul className="h-fit bg-[#229799]">
            <li>
              <Link
                to="/library/album"
                aria-label="Go to album library"
                className={getClassName('/library/album')}
                onClick={() => {}}
              >
                Albums
              </Link>
            </li>
            <li>
              <Link
                to="/library/cd"
                aria-label="Go to cd library"
                className={getClassName('/library/cd')}
                onClick={() => {}}
              >
                CDs
              </Link>
            </li>
            <li>
              <Link
                to="/library/track"
                aria-label="Go to track library"
                className={getClassName('/library/track')}
                onClick={() => {}}
              >
                Tracks
              </Link>
            </li>
          </ul>
        )}
      </div>
      {/* Accordion end */}

      <Link
        to="/add"
        aria-label="Go to Add page"
        className={getClassName('/add')}
        onClick={() => {}}
      >
        Add item
      </Link>
    </nav>
  );
}

export default NavigationBar;
