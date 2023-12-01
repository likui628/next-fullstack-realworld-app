import { ARTICLE_PAGE_LIMIT } from "@/utils/constants";

interface PaginationProps {
  count: number;
  page: number;
}

const Pagination = ({ count, page }: PaginationProps) => {
  const pageCount = Math.ceil(count / ARTICLE_PAGE_LIMIT);
  let countArray = new Array(pageCount).fill("");

  return (
    <nav>
      <ul className="pagination">
        {countArray.map((_, index) => (
          <li key={index} className={page === index + 1 ? "page-item active" : "page-item"}>
            <a className="page-link" href="#">
              {index + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
