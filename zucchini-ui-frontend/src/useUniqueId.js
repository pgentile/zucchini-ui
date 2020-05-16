import { useState } from "react";

let counter = 0;

export default function useUniqueId(prefix) {
  const [id] = useState(() => `${prefix}-${counter++}`);
  return id;
}
