import React, { useState } from "react";
import useCityData from "./useCityData";
import Pagination from "./Pagination";

const TableComp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { cities, loading, totalPages } = useCityData(
    searchTerm,
    limit,
    currentPage
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 5 && value <= 10) {
      setLimit(value);
      setCurrentPage(1);
    } else if (value > 10) {
      setLimit(10);
      setCurrentPage(1);
      alert("Maximum limit exceeded. Please enter a value between 5 and 10.");
    } else {
      setLimit(5);
      setCurrentPage(1);
      alert("Minimum limit reached. Defaulting to 5 items.");
    }
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search places..."
          className="search-input"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : cities?.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th className="table_heading">#</th>
              <th className="table_heading">Place Name</th>
              <th className="table_heading">State name</th>
              <th className="table_heading">Country</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr key={city.id}>
                <td className="table_heading">
                  {(currentPage - 1) * limit + index + 1}
                </td>
                <td className="table_heading">{city.name}</td>
                <td className="table_heading">{city.region}</td>
                <td className="table_heading">{city.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>{searchTerm ? "No result found" : "Start searching"}</div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        limit={limit}
        handleLimitChange={handleLimitChange}
        handlePreviousClick={handlePreviousClick}
        handleNextClick={handleNextClick}
      />
    </div>
  );
};

export default TableComp;
