import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Sidebar from "./components/Sidebar";
import ChartView from "./components/ChartView";
import SearchBar from "./components/SearchBar";
import DateRangeFilter from "./components/DateRangeFilter";

export default function App() {
  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    Papa.parse("/dump.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const parsed = result.data;
        setData(parsed);
        setFilteredData(parsed);

        // 🟢 Set first available stock by default
        const firstCompany = parsed.find((d) => d.index_name)?.index_name;
        if (firstCompany) setSelectedCompany(firstCompany);

        setLoading(false);
      }
    });
  }, []);

  const companies = Array.from(
    new Set(data.map((item) => item.index_name).filter(Boolean))
  );

  const filteredCompanies = companies.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const companyFilteredData = selectedCompany
    ? filteredData.filter((d) => d.index_name === selectedCompany)
    : filteredData;

  const handleDateFilter = (filtered) => {
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-[#0f172a] text-gray-900 dark:text-white transition-colors duration-300">
      <Sidebar
        companies={filteredCompanies}
        selected={selectedCompany}
        onSelect={setSelectedCompany}
      />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center w-full md:w-auto">
            📊 {selectedCompany || "Loading..."} — Stock Performance Overview
          </h1>
        </div>

        <SearchBar
  query={searchTerm}
  onSearch={setSearchTerm}
  results={filteredCompanies}
  onSelect={(name) => {
    setSelectedCompany(name);
    setSearchTerm(""); // clear search after selection
  }}
/>

        <DateRangeFilter data={companyFilteredData} onFilter={handleDateFilter} />

        {loading ? (
          <p className="text-lg text-center mt-10">Loading...</p>
        ) : (
          <ChartView data={companyFilteredData} />
        )}
      </main>
    </div>
  );
}
