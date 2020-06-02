import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToTop ?? true) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}
