import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function NavigationBar() {
  const location = useLocation();
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  function getClassName(page: string) {
    return `flex justify-center items-center h-9 ${
      location.pathname === page ? 'bg-[#359996]' : 'bg-[#176061]'
    } hover:bg-[#48CFCB]`;
  }

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
        <button
          onClick={handleOpen}
          className="flex justify-center items-center h-9 bg-[#176061] hover:bg-[#48CFCB] w-full"
          aria-label="Toggle library submenu"
        >
          Library
          {isAccordionOpen ? (
            <ArrowDropUpIcon className="mt-1" />
          ) : (
            <ArrowDropDownIcon className="mt-1" />
          )}
        </button>
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
