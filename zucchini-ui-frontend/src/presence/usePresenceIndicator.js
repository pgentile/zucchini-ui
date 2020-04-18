import { useEffect } from "react";
import { useDispatch } from "react-redux";

import useWindowVisibility from "../windowVisibility/useWindowVisibility";
import { watch, unwatch } from "./redux";

export default function usePresenceIndicator({ referenceType, reference }) {
  const dispatch = useDispatch();

  const isWindowVisible = useWindowVisibility();

  useEffect(() => {
    if (isWindowVisible) {
      dispatch(watch({ referenceType, reference }));
      return () => dispatch(unwatch());
    }
  }, [dispatch, isWindowVisible, referenceType, reference]);
}
