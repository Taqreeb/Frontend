import React, { useEffect, useState } from "react";

const Pagination = ({ cards, setRecords, recordsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPosts = cards.length;
  const pageNumbers = [];
  const lastPage = Math.ceil(totalPosts / recordsPerPage);
  for (let i = 1; i <= Math.ceil(totalPosts / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      setRecords(cards.slice(firstIndex, lastIndex));
    }
  };
  const nextPage = () => {
    if (currentPage !== lastPage) {
      setCurrentPage(currentPage + 1);
      setRecords(cards.slice(firstIndex, lastIndex));
    }
  };
  useEffect(() => {
    setRecords(cards.slice(firstIndex, lastIndex));
  });

  return (
    <nav>
      <ul className="pagination">
        <li onClick={prePage} className="page-link pagination-hover">
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`page-link ${
              currentPage === number ? "active" : ""
            } pagination-hover`}
          >
            {number}
          </li>
        ))}
        <li onClick={nextPage} className="page-link pagination-hover">
          Next
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
