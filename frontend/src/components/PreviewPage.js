import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPagePreview } from "../utils";
import LazyPages from "./LazyPages";
import { LoadingScreen } from "./LoadingScreen";

function PreviewPage(props) {
  const location = useLocation();
  const [pageView, setPageView] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      // convert querystring to dict
      const querystring = location.search.replace(/^\?/, "");
      const params = {};
      querystring.replace(/([^=&]+)=([^&]*)/g, function (m, key, value) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      });

      const { content_type: contentType, token } = params;
      setLoading(true);
      try {
        const data = await getPagePreview(contentType, token);

        const { pageType } = data;
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


export default PreviewPage;
