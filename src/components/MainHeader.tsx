function MainHeader() {
  return (
    <header className="flex h-12 shadow-md items-center">
      <div>
        <input type="text" className="rounded" />
        <button>Search</button>
      </div>
      <div className="">Options</div>
    </header>
  );
}

export default MainHeader;
