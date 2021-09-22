import React from "react";

export default {
  BlogPage: React.lazy(() => import("./BlogPage")),
  PostPage: React.lazy(() => import("./PostPage")),
};
