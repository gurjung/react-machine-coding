import React, { useState, useEffect } from "react";
import "./pagination.css";

const ROWS_PER_PAGE = 10;

const Pagination = () => {
    // TO DO -> Make it windowed pagination
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const fetchProducts = async () => {
    const url = `https://dummyjson.com/products?limit=${ROWS_PER_PAGE}&skip=${page * ROWS_PER_PAGE}`;
    const resp = await fetch(url);
    const json = await resp.json();
    console.log(json, "json");
    setProducts(json?.products);
    setTotalPages(Math.ceil(json.total / ROWS_PER_PAGE));
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const onClickPage = (page: number) => {
    setPage(page);
  };

  const onPrevious = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const onNext = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <>
      <div>
        {/* render products here on UI. Also we can add shimmer effect, handle error */}
      </div>
      <div>
        <button disabled={page <= 0} onClick={onPrevious}>
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => {
          return (
            <button
              className={`${index === page ? "active" : ""}`}
              key={index}
              onClick={() => onClickPage(index)}
            >
              {index + 1}
            </button>
          );
        })}
        <button disabled={page >= totalPages - 1} onClick={onNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
