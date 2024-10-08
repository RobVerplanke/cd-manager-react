import { Link } from 'react-router-dom';

function NavigationBar() {
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
      <button
        aria-label="Open library sub-menu"
        className="flex justify-center items-center h-9 w-full bg-slate-600 hover:bg-slate-500"
      >
        Library
      </button>
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
            aria-label="Co to track library"
            className="flex justify-center items-center h-9 hover:bg-slate-500"
          >
            Tracks
          </Link>
        </li>
      </ul>
      <Link
        to="add"
        aria-label="Go to Add page"
        className="flex justify-center items-center h-9 bg-slate-600 hover:bg-slate-500"
      >
        Add item
      </Link>
    </nav>
  );
}

export default NavigationBar;
