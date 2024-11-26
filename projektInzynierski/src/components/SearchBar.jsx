function SearchBar() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full p-2  bg-white shadow-md rounded-lg">
      <img
        src="/logo.png"
        className="h-12 sm:h-16 object-contain rounded-md"
        alt="Logo"
      />
      <span className="flex-grow mx-4 mt-2 sm:mt-0">
        <input
          type="text"
          className="border border-gray-300 rounded-full px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Szukaj..."
        />
      </span>
      <span className="flex items-center justify-end mt-2 sm:mt-0">
        <img
          src="/wozek.webp"
          className="w-8 h-8 mr-2 mix-blend-hard-light"
          alt="Koszyk"
        />
        <p className="text-gray-600 text-sm">Koszyk pusty</p>
      </span>
    </div>
  );
}

export default SearchBar;
