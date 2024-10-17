function MainHeader() {
  return (
    <header className="flex h-20 items-center justify-between px-20 text-gray-100">
      <div className="flex">
        <p className="text-[#359996] text-4xl">CD MANAGER</p>
      </div>
      <div>
        <input type="checkbox" name="" id="" />
        Toggle dark mode
      </div>
    </header>
  );
}

export default MainHeader;
