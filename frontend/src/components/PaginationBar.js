import React from 'react';
import { usePagination } from "../hooks/usePagination"


const PaginationBar = ({ currentPage, totalPages }) => {



    // Calculate the range of page numbers to display
  const range = 3;
  const start = Math.max(1, currentPage - range);
  const end = Math.min(totalPages, currentPage + range);

  const pageNumbers = [];
  const {pageChange} = usePagination()



  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = async(page)=>{
    await pageChange(page)
}

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((page) => (
        
        <li key={page} className={currentPage === page ? 'active' : ''}>
            <button value={page} onClick={() => handlePageChange(page)}>{page}</button>
          </li>
     
      
    ))}
      </ul>
    </nav>
  );
};

export default PaginationBar;
