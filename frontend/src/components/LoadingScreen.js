import React from "react";

function LoadingScreen() {
  return (
    <div className="bg-gray-100 fixed inset-0 w-full h-full z-50 flex justify-center items-center dark:bg-gray-900">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 dark:border-gray-100"/>
    </div>
  );
}

export { LoadingScreen };
