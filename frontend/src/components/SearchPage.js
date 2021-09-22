import React, { useEffect, useState } from "react";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { useLocation, Link } from "react-router-dom";
import querystring from "query-string";
import { getPage, convertWagtailUrlToRelative } from "../utils";

function SearchPage() {
  const location = useLocation();
  const [state, setState] = useState({
    searchQuery: "",
    inputSearch: "",
    loading: true,
    hasMore: false,
    loadResults: [],
    btnSearch: false,
  });
  const { searchQuery, inputSearch, loading, hasMore, loadResults, btnSearch } =
    state;

  const queryParams = querystring.parse(location.search);
  const searchQueryString = queryParams.query;

  useEffect(() => {
    // When page load with querystring, we set searchQuery
    if (searchQueryString && !searchQuery && !btnSearch) {
      setState((state) => ({
        ...state,
        searchQuery: searchQueryString,
        inputSearch: searchQueryString,
      }));
    }
  }, [searchQueryString, searchQuery, btnSearch]);

  useEffect(() => {
    // if searchQuery is available, we can query search results
    if (searchQuery && loading) {
      const params = {
        search: searchQuery,
        type: "blog.PostPage",
        offset: loadResults.length,
        limit: 2,
      }
      getPage(`/api/v1/cms/pages/`, params).then((res) => {
        const data = res;
        const newResults = [...loadResults, ...data.items];
        const hasMore = data.meta.totalCount > newResults.length;

        setState((state) => ({
          ...state,
          loading: false,
          loadResults: newResults,
          hasMore: hasMore,
        }));
      });
    }
  }, [searchQuery, loading, loadResults]);

  const handleLoadMoreClick = (e) => {
    e.preventDefault();

    setState((state) => ({
      ...state,
      loading: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setState((state) => ({
      ...state,
      btnSearch: true,
      searchQuery: inputSearch,
      loading: true,
      hasMore: false,
      loadResults: [],
    }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex flex-row flex-wrap py-4">
            <main
              role="main"
              className="w-full sm:w-2/3 md:w-3/4 lg:w-8/12 px-2 mb-4 mx-auto"
            >
              <div>
                <h1 className="text-center text-4xl mb-4">Search</h1>

                <form onSubmit={handleSubmit} className="mb-4">
                  <div className="relative text-gray-700">
                    <input
                      className="w-full h-10 pl-3 pr-8 text-base placeholder-gray-600 border rounded-lg dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Search"
                      type="search"
                      defaultValue={inputSearch}
                      onChange={function (e) {
                        const { value } = e.target;
                        setState((state) => ({
                          ...state,
                          inputSearch: value,
                        }));
                      }}
                    />
                    <button
                      type="submit"
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-blue-500 rounded-r-lg border-blue-500 hover:bg-blue-600"
                    >
                      Go
                    </button>
                  </div>
                </form>

                {loadResults.length === 0 && !loading && (
                  <div className="dark:text-gray-300">No Results Found</div>
                )}

                {loadResults.length > 0 && (
                  <div className="w-full border rounded-lg mb-4 overflow-hidden border-opacity-75 border-gray-300 dark:border-gray-500">
                    <ul className="divide-y-2 divide-gray-100 dark:divide-gray-500 border-opacity-75">
                      {loadResults.map((searchResult) => (
                        <Link
                          to={convertWagtailUrlToRelative(searchResult.meta.htmlUrl)}
                          key={searchResult.id}
                          className="block p-3 hover:bg-gray-200 hover:underline cursor-pointer dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-900"
                        >
                          {searchResult.title}
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}

                {hasMore && (
                  <button
                    onClick={handleLoadMoreClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                  >
                    Load More
                  </button>
                )}

              </div>
            </main>
          </div>
        </div>

      <Footer />
    </div>
  );
}

export default SearchPage;
