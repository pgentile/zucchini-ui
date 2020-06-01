import { useRef } from "react";

export default function useUniqueId() {
  const ref = useRef();
  if (!ref.current) {
    ref.current = generateId();
  }
  return ref.current;
}

export function useMultiUniqueId(keys) {
  const ref = useRef({});

  keys.forEach((key) => {
    if (!(key in ref.current)) {
      ref.current[key] = generateId();
    }
  });

  return ref.current;
}

let counter = 0;

function generateId() {
  return `id-${counter++}`;
}
