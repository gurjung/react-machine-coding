import React, { useMemo, useState } from "react";
import { USERS } from "./constants";
import "./HomePage.css";
import useDebouncedValue from "./useDebounceValue";

const ITEMS_PER_PAGE = 5;
const SEARCHABLE_FIELDS = ["name", "email", "role"] as const;

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(0);

  const debouncedSearch = useDebouncedValue(searchTerm, 500);

  const filteredUsers = useMemo(() => {
    let query = debouncedSearch?.trim()?.toLowerCase();
    if (!query) return USERS;

    return USERS.filter((user) =>
      SEARCHABLE_FIELDS.some((field) =>
        user[field]?.trim()?.toLowerCase().includes(query),
      ),
    );
  }, [debouncedSearch]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const goToPage = (page: any) => {
    if (page < 0 || page >= totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <>
      <div className="search-container">
        <label htmlFor="user-search">Search users</label>

        <input
          id="user-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name, email, or role"
        />
      </div>
      <div className="table-caption">List of users</div>
      <div className="table-container">
        {/* search filters */}
        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredUsers.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Prev
          </button>
          <span>
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default HomePage;
