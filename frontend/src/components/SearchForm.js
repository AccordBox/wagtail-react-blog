import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SearchForm() {
  let history = useHistory();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push({
      pathname: "/search/",
      search: `?query=${searchQuery}`,
    });
  };

  return (
    <div className="mb-4 border rounded-lg border-opacity-75 border-gray-300 shadow-xl overflow-hidden dark:border-gray-500">
      <div className="bg-gray-100 text-gray-900 px-6 py-4 dark:bg-gray-700 dark:text-gray-400">
        <h4 className="text-base font-medium">Search</h4>
      </div>
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="relative text-gray-700">
            <input
              className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              placeholder="Search"
              type="search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-500 rounded-r-lg border-blue-500 hover:bg-blue-600"
            >
              Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { SearchForm };
