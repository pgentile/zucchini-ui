import { useState, useCallback, useEffect, useDebugValue, useMemo } from "react";
import debounce from "lodash/debounce";

export default function useWindowVisibility() {
  const [visible, setVisible] = useState(true);

  useDebugValue(visible ? "Visible" : "Not visible");

  // These events are throttled because the full screen mode in chrome
  // triggers two events : hidden then visible.
  const markInvisible = useMemo(() => {
    return debounce(() => {
      setVisible(false);
    }, 500);
  }, []);

  const markVisible = useCallback(() => {
    markInvisible.cancel();
    setVisible(true);
  }, [markInvisible]);

  useEffect(() => {
    console.info("Adding visibility change listener");

    setVisible(document.visibilityState !== "hidden");

    const handleVisibilityChange = () => {
      const visible = document.visibilityState !== "hidden";
      visible ? markVisible() : markInvisible();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      markInvisible.cancel();
    };
  }, [markInvisible, markVisible]);

  useEffect(() => {
    console.info("Visibility changed:", visible);
  }, [visible]);

  return visible;
}
