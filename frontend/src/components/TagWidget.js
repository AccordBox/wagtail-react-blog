import React from "react";
import { Link } from "react-router-dom";

function TagWidget(props) {
  const { tagsList } = props;

  return (
    <div
      className="mb-4 border rounded-lg border-opacity-75 border-gray-300 shadow-xl overflow-hidden dark:border-gray-500">
      <div className="bg-gray-100 text-gray-900 px-6 py-4 dark:bg-gray-700 dark:text-gray-400">
        <h4 className="text-base font-medium">Tags</h4>
      </div>
      <div className="px-6 py-4">
        {tagsList.map((tag) => (
          <Link
            to={`${tag.url}`}
            key={tag.slug}
            className="text-gray-600 hover:text-gray-800"
          >
            <span
              className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-white bg-gray-600 hover:bg-gray-500 focus:bg-gray-700 rounded-full">
              {tag.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { TagWidget };
