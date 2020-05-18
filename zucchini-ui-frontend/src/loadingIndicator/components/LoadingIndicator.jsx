import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import EventScheduler from "../EventScheduler";
import LoadingBar from "./LoadingBar";

const inactiveBarState = {
  start: false,
  pending: false,
  ending: false,
  done: false
};

export default function LoadingIndicator() {
  const [eventScheduler] = useState(() => new EventScheduler());

  useEffect(() => {
    return () => eventScheduler.dispose();
  }, [eventScheduler]);

  const [barState, setBarState] = useState(inactiveBarState);

  const scheduleBarState = useCallback(
    (newBarState, timeout) => {
      eventScheduler.schedule(() => {
        setBarState((currentBarState) => ({
          ...currentBarState,
          ...newBarState
        }));
      }, timeout);
    },
    [eventScheduler]
  );

  const active = useSelector((state) => state.loadingIndicator.count > 0);

  useEffect(() => {
    if (active) {
      scheduleBarState({ start: true });
      scheduleBarState({ pending: true });
    } else {
      scheduleBarState({ ending: true }, 100);
      scheduleBarState({ done: true }, 200);
      scheduleBarState(inactiveBarState);
    }
  }, [active, scheduleBarState]);

  return <LoadingBar {...barState} />;
}
