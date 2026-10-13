import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (currPage: number) => void;
}

const NewPagination = (props: PaginationProps) => {
  // call api and get data

  // window pagination -> start btn, middle window, last btn
  const siblingSize = 2;

  let paginationBtns = [];

  let startWindow = Math.max(props.currentPage - siblingSize, 0);

  let endWindow = Math.min(
    props.currentPage + siblingSize,
    props.totalPages - 1,
  );

  for (let i = startWindow; i <= endWindow; i++) {
    paginationBtns.push(i);
  }

  const onPrev = () => {
    props.onPageChange(Math.max(props.currentPage - 1, 0));
  };

  const onNext = () => {
    props.onPageChange(Math.min(props.currentPage + 1, props.totalPages - 1));
  };

  const onPageClick = (pageNumber: number) => {
    props.onPageChange(pageNumber);
  };

  return (
    <nav aria-label="pagination">
      {/* prev */}
      <button
        onClick={onPrev}
        disabled={props.currentPage === 0}
        aria-label="Previous Page"
      >
        prev
      </button>
      {startWindow > 0 && <button onClick={() => onPageClick(0)}>1</button>}
      ...
      {paginationBtns.map((item) => (
        <button
          key={item}
          onClick={() => onPageClick(item)}
          className={props.currentPage === item ? "active" : ""}
          aria-current={props.currentPage === item ? "page" : undefined}
          aria-label={`Go to Page ${item + 1}`}
        >
          {item + 1}
        </button>
      ))}
      ...
      {endWindow < props.totalPages - 1 && (
        <button onClick={() => onPageClick(props.totalPages - 1)}>
          {props.totalPages}
        </button>
      )}
      {/* next */}
      <button
        onClick={onNext}
        disabled={props.currentPage === props.totalPages - 1}
        aria-label="Next Page"
      >
        next
      </button>
    </nav>
  );
};

export default NewPagination;
