import React from "react";

export default function SearchBar({ query, onSearch, results, onSelect }) {
  return (
    <div className="mb-6 relative w-full md:w-1/2">
      <input
        type="text"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by Company..."
        className="px-4 py-2 border rounded-lg w-full"
      />
      {query && results.length > 0 && (
        <ul className="absolute z-10 bg-white dark:bg-gray-800 border mt-1 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto">
          {results.map((name) => (
            <li
              key={name}
              onClick={() => onSelect(name)}
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
