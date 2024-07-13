import { Link, useLocation } from 'react-router-dom';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '1', 10);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pages = [];
  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <li key={page} className={currentPage === page ? 'active' : ''}>
        <Link to={`${location.pathname}?page=${page}`}>{page}</Link>
      </li>
    );
  }

  return <ul className="pagination">{pages}</ul>;
}
