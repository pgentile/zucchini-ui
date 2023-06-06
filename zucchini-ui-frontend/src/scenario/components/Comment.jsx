import PropTypes from "prop-types";
import { memo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import queryString from "query-string";

import toNiceDate from "../../ui/toNiceDate";
import CommentText from "./CommentText";
import CommentEditor from "./CommentEditor";

function Comment({ comment }) {
  const [editMode, setEditMode] = useState(false);
  const testRunId = useSelector((state) => state.scenario.scenario.testRunId || null);

  let testRunInfo;
  if (comment.testRunId === testRunId) {
    testRunInfo = <i>(tir de test actuel)</i>;
  } else if (comment.testRun) {
    testRunInfo = (
      <span>
        (tir du <Link to={`/scenarios/${comment.scenarioId}`}>{toNiceDate(comment.testRun.date)}</Link>, type{" "}
        <Link to={{ pathname: "/", search: queryString.stringify({ type: comment.testRun.type }) }}>
          {comment.testRun.type}
        </Link>
        )
      </span>
    );
  } else {
    testRunInfo = <i>(tir supprimé)</i>;
  }

  const handleToggleEditMode = useCallback(() => {
    setEditMode((current) => !current);
  }, []);

  let commentComponent;
  if (editMode) {
    commentComponent = (
      <CommentEditor comment={comment} onCancel={handleToggleEditMode} onSaved={handleToggleEditMode} />
    );
  } else {
    commentComponent = <CommentText comment={comment} onEdit={handleToggleEditMode} />;
  }

  return (
    <section className="mb-3" id={`comment-${comment.id}`} tabIndex={-1}>
      <h4>
        Le {toNiceDate(comment.date)} <small>{testRunInfo}</small>
      </h4>
      {commentComponent}
    </section>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default memo(Comment);
