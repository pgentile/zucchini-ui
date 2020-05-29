import { useState } from "react";

let counter = 0;

export default function useUniqueId() {
  const [id] = useState(() => `id-${counter++}`);
  return id;
}

export function useMultiUniqueId(keys) {
  const [ids] = useState(() => {
    const idsByKey = {};
    keys.forEach((key) => {
      idsByKey[key] = `id-${counter++}`;
    });
    return Object.seal(idsByKey);
  });
  return ids;
}
