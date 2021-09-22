import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPage } from "../utils";
import LazyPages from "./LazyPages";
import { LoadingScreen } from "./LoadingScreen";

function PageProxy(props) {
  const location = useLocation();
  const [pageView, setPageView] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading(true);
      try {
        setLoading(true);
        const data = await getPage(location.pathname);
        const {pageType} = data;
        const PageComponent = LazyPages[pageType];
        const view = <PageComponent {...props} {...data} />;
        setPageView(view);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchPageData();
  }, [location, props]);

  if (loading) {
    return <LoadingScreen/>;
  }

  if (pageView) {
    return (
      <React.Suspense fallback={LoadingScreen}>{pageView}</React.Suspense>
    );
  } else {
    return <div>Error when loading content</div>;
  }
}

export default PageProxy;
