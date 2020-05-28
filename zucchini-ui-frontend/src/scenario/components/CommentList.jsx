import React, { memo } from "react";
import { useSelector } from "react-redux";

import Comment from "./Comment";

function CommentList() {
  const comments = useSelector((state) => state.scenario.comments);

  return comments.map((comment) => {
    return <Comment key={comment.id} comment={comment} />;
  });
}

export default memo(CommentList);
