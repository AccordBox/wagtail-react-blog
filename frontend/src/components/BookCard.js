import React from "react";

function BookCard() {
  return (
    <div className="border rounded-lg border-opacity-75 border-gray-300 shadow-xl overflow-hidden dark:border-gray-500">
      <div className="m-3 lg:m-6">
        <div className="mb-4 px-3 lg:px-8">
          <a href="https://leanpub.com/react-wagtail">
            <img src="https://www.accordbox.com/upload/images/build-spa-react-wagtail-cover.original.jpg" alt=""/>
          </a>
        </div>
        <div className="mb-4">
          <p>This book will teach you how to build a SPA (single-page application) with React and Wagtail CMS</p>
        </div>
        <a href="https://leanpub.com/react-wagtail"
           className="block w-full px-4 py-2 text-white text-center bg-blue-500 border border-blue-500 hover:bg-blue-600 rounded-lg">
          Read More
        </a>
      </div>
    </div>
  )
}

export { BookCard };