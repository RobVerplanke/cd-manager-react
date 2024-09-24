import '../styles/MainHeader.css';

function MainHeader() {
  return (
    <header className="header">
      <div className="header__searchbar">
        <input type="text" />
        Search
      </div>
      <div className="header__options">Options</div>
    </header>
  );
}

export default MainHeader;
