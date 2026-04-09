import type { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';
import useIsMobile from '@/hooks/useIsMobile';

interface PaginationProps {
  currentPage: number;
  pages: null[];
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
  const isMobile = useIsMobile(450);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.chevron}
        disabled={currentPage === 1}
        onClick={decrementPage}
      >
        <ChevronLeft size={isMobile ? 20 : 24} />
      </button>
      <div className={styles.pages}>
        {pages.map((_, i) => (
          <button
            key={i}
            className={
              currentPage === i + 1
                ? `${styles.pageButton} ${styles.currentPage}`
                : styles.pageButton
            }
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        className={styles.chevron}
        disabled={currentPage === totalPages}
        onClick={incrementPage}
      >
        <ChevronRight size={isMobile ? 20 : 24} />
      </button>
    </div>
  );
};

export default Pagination;
