import { useState, useRef } from "react";

export default function useSyncValue(value, fn) {
  const [initial, setInitial] = useState(true);
  const previousValue = useRef();

  if (initial) {
    fn(value);
    setInitial(false);
  } else {
    if (value !== previousValue.current) {
      fn(value);
    }
  }

  previousValue.current = value;
}
