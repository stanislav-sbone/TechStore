import type { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useIsMobile from '@/hooks/useIsMobile';
import { MOBILE_BREAKPOINT } from '@/constants/breakpoints';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  pages: number[];
  totalPages: number;
  setCurrentPage: (page: number) => void;
  incrementPage: () => void;
  decrementPage: () => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pages,
  totalPages,
  setCurrentPage,
  incrementPage,
  decrementPage,
}) => {
  const isMobile = useIsMobile(MOBILE_BREAKPOINT);

  const firstVisiblePage = pages[0];
  const lastVisiblePage = pages[pages.length - 1];

  const showFirstPage = firstVisiblePage > 1;
  const showLastPage = lastVisiblePage < totalPages;

  const showLeftEllipsis = firstVisiblePage > 2;
  const showRightEllipsis = lastVisiblePage < totalPages - 1;

  return (
    <div className={styles.pagination}>
      <button
        className={styles.chevron}
        disabled={currentPage === 1}
        onClick={decrementPage}
      >
        <ChevronLeft size={isMobile ? 16 : 24} />
      </button>
      <div className={styles.pages}>
        {showFirstPage && (
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
        )}

        {showLeftEllipsis && <span className={styles.ellipsis}>...</span>}

        {pages.map((page) => (
          <button
            key={page}
            className={
              currentPage === page
                ? `${styles.pageButton} ${styles.currentPage}`
                : styles.pageButton
            }
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        {showRightEllipsis && <span className={styles.ellipsis}>...</span>}

        {showLastPage && (
          <button
            type="button"
            className={styles.pageButton}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </button>
        )}
      </div>
      <button
        className={styles.chevron}
        disabled={currentPage === totalPages}
        onClick={incrementPage}
      >
        <ChevronRight size={isMobile ? 16 : 24} />
      </button>
    </div>
  );
};

export default Pagination;
