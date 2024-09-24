import { Link } from 'react-router-dom';
import '../styles/NavigationBar.css';

function NavigationBar() {
  return (
    <nav className="nav">
      <div className="nav__buttons">
        <Link to="/" aria-label="Go to Browse page">
          Browse
        </Link>
        <Link to="/search" aria-label="Go to Search page">
          Search
        </Link>
        <button aria-label="Open library sub-menu">Library</button>
        <ul className="nav__buttons__list hidden">
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
      </div>
    </nav>
  );
}

export default NavigationBar;
