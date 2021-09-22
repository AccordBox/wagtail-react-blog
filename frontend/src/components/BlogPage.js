import React from "react";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";
import { PostPageCardContainer } from "./PostPageCardContainer";

function BlogPage(props) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />

      <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex flex-row flex-wrap py-4">
          <PostPageCardContainer {...props} />
          <SideBar {...props} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BlogPage;
