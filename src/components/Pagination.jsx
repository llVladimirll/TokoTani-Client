// src/components/Pagination.js
import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (e, page) => {
    e.preventDefault();
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <a
          href="#"
          className="rounded prev"
          onClick={(e) => handlePageClick(e, currentPage - 1)}
        >
          &laquo; Previous
        </a>
      )}
      {currentPage < totalPages && (
        <a
          href="#"
          className="rounded next"
          onClick={(e) => handlePageClick(e, currentPage + 1)}
        >
          Next &raquo;
        </a>
      )}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
