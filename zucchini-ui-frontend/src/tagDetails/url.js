import { useMemo, useCallback } from "react";
import isString from "lodash/isString";
import queryString from "query-string";
import { useNavigate } from "react-router";

import useQueryParams from "../useQueryParams";

export function useParsedTags() {
  const queryParams = useQueryParams();

  const tags = useMemo(() => toArray(queryParams.tag), [queryParams.tag]);
  const excludedTags = useMemo(() => toArray(queryParams.excludedTag), [queryParams.excludedTag]);

  return useMemo(() => {
    return {
      tags,
      excludedTags
    };
  }, [tags, excludedTags]);
}

export function useNavigateToTags() {
  const navigate = useNavigate();
  return useCallback(
    ({ tags, excludedTags }) => {
      navigate({
        search: queryString.stringify({
          tag: tags,
          excludedTag: excludedTags
        })
      });
    },
    [navigate]
  );
}

function toArray(value) {
  if (!value) {
    return [];
  }

  if (isString(value)) {
    return [value];
  }

  return value;
}
