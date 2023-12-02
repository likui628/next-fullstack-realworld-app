import { ARTICLE_PAGE_LIMIT } from "@/utils/constants";
import QueryLink from "@/components/common/QueryLink";

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
            <QueryLink reserved query={{ page: index + 1 }} key={index} className="page-link">
              {index + 1}
            </QueryLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
