import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function NavigationBar() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open); // Toggle the accordion navigation (Library option)
  };
  return (
    <nav className="text-gray-300">
      <Link
        to="/"
        aria-label="Go to Browse page"
        className="flex justify-center items-center h-9 bg-slate-600 hover:bg-slate-500"
      >
        Browse
      </Link>
      <Link
        to="/search"
        aria-label="Go to Search page"
        className="flex justify-center items-center h-9 bg-slate-600 hover:bg-slate-500"
      >
        Search
      </Link>

      {/* Accordion start */}
      <div>
        <button
          onClick={handleOpen}
          className="flex justify-center items-center h-9 bg-slate-600 hover:bg-slate-500 w-full"
        >
          Library
          {open ? (
            <ArrowDropUpIcon className="mt-1" />
          ) : (
            <ArrowDropDownIcon className="mt-1" />
          )}
        </button>
        {open && (
          <ul className="h-fit bg-slate-600">
            <li>
              <Link
                to="/library/album"
                aria-label="Go to album library"
                className="flex justify-center items-center h-9 hover:bg-slate-500"
              >
                Albums
              </Link>
            </li>
            <li>
              <Link
                to="/library/cd"
                aria-label="Go to cd library"
                className="flex justify-center items-center h-9 hover:bg-slate-500"
              >
                CDs
              </Link>
            </li>
            <li>
              <Link
                to="/library/track"
                aria-label="Go to track library"
                className="flex justify-center items-center h-9 hover:bg-slate-500"
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
        className="flex justify-center items-center h-9 bg-slate-600 hover:bg-slate-500"
      >
        Add item
      </Link>
    </nav>
  );
}

export default NavigationBar;
