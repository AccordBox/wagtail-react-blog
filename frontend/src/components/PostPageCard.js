import React from "react";
import { BaseImage } from "./BaseImage";
import { Link } from "react-router-dom";

function PostPageCard(props) {
  const {post} = props;
  const {pageContent} = post;
  const dateStr = new Date(pageContent.lastPublishedAt).toUTCString();

  return (
    <div className="mb-4 rounded-lg border border-opacity-75 border-gray-300 shadow-xl overflow-hidden dark:text-white dark:border-gray-500">
      <Link to={pageContent.url}>
        <BaseImage img={pageContent.headerImage}/>
      </Link>
      <div className="p-6">
        <h2 className="title-font text-3xl text-blue-900 mb-6 dark:text-white ">
          <Link to={pageContent.url}>{pageContent.title}</Link>
        </h2>
        <Link
          to={pageContent.url}
          className="px-4 py-3 text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 rounded-lg"
        >
          Read More →
        </Link>
      </div>
      <div className="bg-gray-100 px-6 py-4 dark:bg-gray-700">
        <h4 className="text-base text-gray-900 dark:text-gray-400">
          Posted on {dateStr}
        </h4>
      </div>
    </div>
  );
}

export { PostPageCard };
