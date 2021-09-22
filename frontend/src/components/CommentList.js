import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { CommentForm } from "./CommentForm";
import { getPage } from "../utils";
import useOnScreen from "../hooks/useOnScreen";

// https://swr.vercel.app/docs/arguments
const fetcher = (...args) => {
  const [url, objectPk, contentType] = args;
  return getPage(url, {
    objectPk: objectPk,
    contentType: contentType,
  });
};

function CommentList(props) {
  const { pageContent } = props;
  const { id: objectPk, contentTypeStr: contentType } = pageContent;

  const ref = React.useRef();
  const isVisible = useOnScreen(ref);

  const [commentsCount, setCommentsCount] = useState(0);
  const [loadComments, setLoadComments] = useState([]);

  const COMMENTS_API_URL = `/api/v1/comments/`;
  const key = [COMMENTS_API_URL, objectPk, contentType];
  const { data } = useSWR(key, fetcher);

  const refreshForNewComment = () => {
    mutate(key);
  };

  useEffect(() => {
    if (data && commentsCount !== data.count) {
      setCommentsCount(data.count);
    }
  }, [data, commentsCount]);

  useEffect(() => {
    if (isVisible && loadComments.length !== commentsCount) {
      getPage(COMMENTS_API_URL, {
        limit: 10,
        offset: loadComments.length,
        objectPk: objectPk,
        contentType: contentType,
      }).then((res) => {
        // combine
        const newComments = [...loadComments, ...res.results];
        setLoadComments(newComments);
      });
    }
  }, [
    isVisible,
    commentsCount,
    loadComments,
    objectPk,
    contentType,
    COMMENTS_API_URL,
  ]);

  return (
    <div className="dark:text-gray-300">
      {loadComments.map((commentObj) => (
        <div className="flex my-4" key={commentObj.pk}>
          {/* eslint-disable-next-line */}
          <div className="flex-none">
            <img
              width={64}
              height={64}
              src="http://via.placeholder.com/64"
              alt="Generic placeholder"
              className="flex-none"
            />
          </div>
          <div className="ml-3">
            <div className="comment-date">
              <strong className="text-primary">{commentObj.userName}</strong>{" "}
              <small>{new Date(commentObj.submitDate).toString()}</small>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: commentObj.prettyComment }}
            />
          </div>
        </div>
      ))}
      <div ref={ref} />
      <CommentForm refreshForNewComment={refreshForNewComment} {...props} />
    </div>
  );
}

export { CommentList };
