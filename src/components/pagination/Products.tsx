import React, { useEffect, useState } from "react";
import NewPagination from "./NewPagination";

const ROWS_PER_PAGE = 10;

const Products = () => {
  const [page, setPage] = useState<number>(0);
  const [products, setProducts] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchProducts = async () => {
    const url = `https://dummyjson.com/products?limit=${ROWS_PER_PAGE}&skip=${page * ROWS_PER_PAGE}`;
    const response = await fetch(url);
    const result = await response.json();
    setProducts(result.products);
    setTotalPages(Math.ceil(result.total / ROWS_PER_PAGE));
  };

  const onPageChange = (currPage: number) => {
    setPage(currPage);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);
  return (
    <main>
      <section>Show All Products here</section>
      <NewPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </main>
  );
};

export default Products;
