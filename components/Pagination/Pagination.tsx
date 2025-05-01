// import React, { useState, useEffect } from "react";
// import styles from "./Pagination.module.scss";

// const Pagination = ({
//   totalItems,
//   currentPage,
//   setCurrentPage,
//   itemsPerPage,
//   setItemsPerPage,
// }: any) => {
//   const [totalPages, setTotalPages] = useState(1);
//   const [pageInputValue, setPageInputValue] = useState(currentPage.toString());

//   useEffect(() => {
//     setTotalPages(Math.ceil(totalItems / itemsPerPage));
//     setPageInputValue(currentPage.toString());
//   }, [totalItems, itemsPerPage, currentPage]);

//   const handlePageInputChange = (e: any) => {
//     setPageInputValue(e.target.value);
//   };

//   const handlePageInputBlur = () => {
//     const pageNum = parseInt(pageInputValue, 10);
//     if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
//       setCurrentPage(pageNum);
//     } else {
//       setPageInputValue(currentPage.toString());
//     }
//   };

//   const handlePageInputKeyPress = (e: any) => {
//     if (e.key === "Enter") {
//       handlePageInputBlur();
//     }
//   };

//   const handleItemsPerPageChange = (e: any) => {
//     const newItemsPerPage = parseInt(e.target.value, 10);
//     setItemsPerPage(newItemsPerPage);
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };

//   return (
//     <div className={styles.paginationContainer}>
//       <div className={styles.itemsInfo}>
//         Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} to{" "}
//         {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} rows
//       </div>

//       <div className={styles.rowsPerPage}>
//         <select
//           value={itemsPerPage}
//           onChange={handleItemsPerPageChange}
//           className={styles.rowsSelect}
//         >
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={50}>50</option>
//           <option value={100}>100</option>
//         </select>
//         <span className={styles.rowsLabel}>rows per page</span>
//       </div>

//       <div className={styles.pageNavigation}>
//         <span className={styles.pageLabel}>Page</span>
//         <input
//           type="text"
//           value={pageInputValue}
//           onChange={handlePageInputChange}
//           onBlur={handlePageInputBlur}
//           onKeyPress={handlePageInputKeyPress}
//           className={styles.pageInput}
//         />
//         <span className={styles.pageTotal}>of {totalPages}</span>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
import React, { useState, useEffect } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  totalItems,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}: any) => {
  const [totalPages, setTotalPages] = useState(1);
  const [pageInputValue, setPageInputValue] = useState(currentPage.toString());

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / itemsPerPage));
    setPageInputValue(currentPage.toString());
  }, [totalItems, itemsPerPage, currentPage]);

  const handlePageInputChange = (e: any) => {
    setPageInputValue(e.target.value);
  };

  const handlePageInputBlur = () => {
    const pageNum = parseInt(pageInputValue, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    } else {
      setPageInputValue(currentPage.toString());
    }
  };

  const handlePageInputKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handlePageInputBlur();
    }
  };

  const handleItemsPerPageChange = (e: any) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.itemsInfoLeftDiv}>
        <div className={styles.itemsInfo}>
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}{" "}
          to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          rows
        </div>

        <div className={styles.rowsPerPage}>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className={styles.rowsSelect}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span className={styles.rowsLabel}>rows per page</span>
        </div>
      </div>
      <div className={styles.pageNavigation}>
        <span className={styles.pageLabel}>Page</span>

        <div className={styles.pageInputContainer}>
          <input
            type="text"
            value={pageInputValue}
            onChange={handlePageInputChange}
            onBlur={handlePageInputBlur}
            onKeyPress={handlePageInputKeyPress}
            className={styles.pageInput}
            readOnly
          />

          <div className={styles.arrowsContainer}>
            <button
              className={styles.pageArrowButton}
              onClick={goToNextPage}
              disabled={currentPage >= totalPages}
            >
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 0L12 6H0L6 0Z" fill="currentColor" />
              </svg>
            </button>

            <button
              className={styles.pageArrowButton}
              onClick={goToPreviousPage}
              disabled={currentPage <= 1}
            >
              <svg
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 6L0 0H12L6 6Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        <span className={styles.pageTotal}>of {totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
