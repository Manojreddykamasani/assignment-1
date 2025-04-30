import React, { useState } from "react";

export default function DateRangeFilter({ data, onFilter }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleDateFilter = () => {
    const filtered = data.filter((d) => {
      const date = new Date(d.index_date);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
    onFilter(filtered);
  };

  return (
    <div className="mb-6 flex items-center space-x-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      />
      <button
        onClick={handleDateFilter}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
      >
        Apply Date Filter
      </button>
    </div>
  );
}
