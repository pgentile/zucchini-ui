import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function useQueryParams() {
  const location = useLocation();
  const queryParams = useMemo(() => {
    return queryString.parse(location.search);
  }, [location.search]);

  return queryParams;
}
