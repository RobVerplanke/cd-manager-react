function MainHeader() {
  return (
    <header className="flex h-12 items-center">
      <div className="flex-grow">
        <div>
          <input type="text" className="ml-4 rounded" />
          <button className="ml-2 text-xs bg-white px-2 py-1 rounded-full hover:bg-slate-300">
            Quick Search
          </button>
        </div>
      </div>
      <div className="pr-8">
        <input type="checkbox" name="" id="" />
        Toggle dark mode
      </div>
    </header>
  );
}

export default MainHeader;
