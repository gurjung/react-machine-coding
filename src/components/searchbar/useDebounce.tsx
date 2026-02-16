import React, { useState, useEffect } from "react";

const useDebounce = (searchValue: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(searchValue || "");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, delay);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchValue, delay]);

  return debouncedValue;
};

export default useDebounce;
