import { useState } from "react";

let counter = 0;

export default function useUniqueId(prefix) {
  const [id] = useState(() => `${prefix}-${counter++}`);
  return id;
}

export function useMultiUniqueId(prefix, keys) {
  const [ids] = useState(() => {
    const idsByKey = {};
    keys.forEach((key) => {
      idsByKey[key] = `${prefix}-${counter++}`;
    });
    return Object.seal(idsByKey);
  });
  return ids;
}
