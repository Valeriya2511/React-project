import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './pagination.css';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  pageRangeDisplayed?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  pageRangeDisplayed = 5,
}) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let currentPage = parseInt(queryParams.get('page') || '1', 10);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const goToPreviousPage = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      queryParams.set('page', prevPage.toString());
      window.history.replaceState(
        null,
        '',
        `${location.pathname}?${queryParams.toString()}`
      );
      currentPage = prevPage;
    }
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      queryParams.set('page', nextPage.toString());
      window.history.replaceState(
        null,
        '',
        `${location.pathname}?${queryParams.toString()}`
      );
      currentPage = nextPage;
    }
  };

  const pages = [];
  let startPage = Math.max(1, currentPage - Math.floor(pageRangeDisplayed / 2));
  const endPage = Math.min(totalPages, startPage + pageRangeDisplayed - 1);

  if (endPage - startPage + 1 < pageRangeDisplayed) {
    startPage = Math.max(1, endPage - pageRangeDisplayed + 1);
  }

  for (let page = startPage; page <= endPage; page++) {
    pages.push(
      <li key={page} className={currentPage === page ? 'active' : ''}>
        <Link to={`${location.pathname}?page=${page}`}>{page}</Link>
      </li>
    );
  }

  if (startPage > 1) {
    pages.unshift(
      <li key="startEllipsis" className="disabled">
        <span>...</span>
      </li>
    );
    pages.unshift(
      <li key="1">
        <Link to={`${location.pathname}?page=1`}>1</Link>
      </li>
    );
  }

  if (endPage < totalPages) {
    pages.push(
      <li key="endEllipsis" className="disabled">
        <span>...</span>
      </li>
    );
  }

  return (
    <ul className="pagination">
      <li className={currentPage === 1 ? 'disabled' : ''}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
      </li>
      {pages}
      <li className={currentPage === totalPages ? 'disabled' : ''}>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
