import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  limit,
  handleLimitChange,
  handlePreviousClick,
  handleNextClick
}) => {
  return (
    totalPages > 1 && (
      <div className="pagination-container">
        <input
          type="number"
          value={limit}
          onChange={handleLimitChange}
          min="5"
          className="limit-input"
        />
        <button
          className="pagination-button"
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-current-page">{currentPage}</span>
        <button
          className="pagination-button"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    )
  );
};

export default Pagination;
