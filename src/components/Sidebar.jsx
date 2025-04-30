import React from "react";
import clsx from "clsx";

export default function Sidebar({ companies, onSelect, selected }) {
  return (
    <aside className="w-full md:w-64 bg-white dark:bg-[#1e293b] p-4 shadow-lg md:h-screen">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">📈 Stock Name</h2>

      {/* Company List */}
      <ul className="space-y-2 overflow-y-auto max-h-[70vh]">
        {companies.map((name, idx) => (
          <li
            key={`${name}-${idx}`}
            onClick={() => onSelect(name)}
            className={clsx(
              "cursor-pointer px-4 py-2 rounded-lg transition font-medium",
              selected === name
                ? "bg-blue-600 text-white"
                : "text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-700"
            )}
          >
            {name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
