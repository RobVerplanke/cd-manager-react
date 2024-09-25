import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className="flex flex-col w-40">
      <Link to="/" aria-label="Go to Browse page">
        Browse
      </Link>
      <Link to="/search" aria-label="Go to Search page">
        Search
      </Link>
      <button aria-label="Open library sub-menu">Library</button>
      <ul className="">
        <li>
          <Link to="/library/albums" aria-label="Go to album library">
            Albums
          </Link>
        </li>
        <li>
          <Link to="/library/cds" aria-label="Go to cd library">
            Cd's
          </Link>
        </li>
        <li>
          <Link to="/library/tracks" aria-label="Co to track library">
            Tracks
          </Link>
        </li>
      </ul>
      <Link to="add" aria-label="Go to Add page">
        Add item
      </Link>
    </nav>
  );
}

export default NavigationBar;
