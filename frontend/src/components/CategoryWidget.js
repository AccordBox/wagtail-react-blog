import React from "react";
import { Link } from "react-router-dom";

function CategoryWidget(props) {
  const { categoriesList } = props;
  return (
    <div className="mb-4 border rounded-lg border-opacity-75 border-gray-300 shadow-xl overflow-hidden dark:border-gray-500">
      <div className="bg-gray-100 text-gray-900 px-6 py-4 dark:bg-gray-700 dark:text-gray-400">
        <h4 className="text-base font-medium">Categories</h4>
      </div>
      <div className="px-6 py-4">
        <nav className="list-none">
          {categoriesList.map((category) => (
            <li key={category.slug}>
              <Link
                to={`${category.url}`}
                className="text-gray-600 hover:text-gray-800 no-underline hover:underline dark:text-white"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </nav>
      </div>
    </div>
  );
}

export { CategoryWidget };
