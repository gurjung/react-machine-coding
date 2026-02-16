import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import useDebounce from "./useDebounce";

type SearchResultsType = {
  login: string;
  id: string;
};

const Searchbar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultsType[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const debouncedSearchText = useDebounce(searchText, 300);

  const fetchData = async (query: string, signal: AbortSignal) => {
    try {
      const url = `https://api.github.com/search/users?per_page=5&q=${query}`;
      const response = await fetch(url, { signal });
      const results = await response.json();
      setSearchResults(results?.items || []);
    } catch (e) {
      // handle error
    }
  };

  useEffect(() => {
    if (debouncedSearchText.length < 2) return;
    const controller = new AbortController();
    fetchData(debouncedSearchText, controller.signal);
    return () => controller.abort();
  }, [debouncedSearchText]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    if (event.target.value === "") {
      setSearchResults([]);
    }
  };

  return (
    <div className="searchbox-container">
      {/* input type search along with clear button*/}
      <input
        type="search"
        placeholder="search github users"
        className="searchbox"
        onChange={onChange}
        value={searchText}
        onFocus={() => setShowResults(true)}
        onBlur={() => {
          setTimeout(() => {
            setShowResults(false);
          }, 150);
        }}
        role="combobox"
        aria-expanded={showResults}
        aria-controls="search-results"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        //aria-busy={} if loading state
      />
      {/* ul li items to show search results */}
      {searchResults?.length > 0 && showResults && (
        <ul className="list-item-container">
          {searchResults?.map((item) => (
            <li key={item.id}>{item.login}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
