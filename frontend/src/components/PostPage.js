import React from "react";
import { PostDetail } from "./PostDetail";
import { SideBar } from "./SideBar";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";

function PostPage(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-wrap py-4">
          <PostDetail {...props} />
          <SideBar {...props} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PostPage;
