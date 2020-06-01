import QuickLRU from "quick-lru";

export function update(object, path, updateFn) {
  const parsedPath = parsePath(path);
  return updateByPath(object, parsedPath, updateFn);
}

export function updateValue(object, path, newValue) {
  return update(object, path, () => newValue);
}

function updateByPath(object, path, updateFn) {
  const [currentPart, ...remainingPath] = path;

  const valueToUpdate = object[currentPart];
  const isLeaf = remainingPath.length === 0;
  const updatedValue = isLeaf ? updateFn(valueToUpdate) : updateByPath(valueToUpdate, remainingPath, updateFn);

  if (updatedValue === valueToUpdate) {
    return object;
  }

  const newObject = typeof currentPart === "number" ? Array.from(object) : Object.assign({}, object);
  newObject[currentPart] = updatedValue;
  return newObject;
}

function wrapWithCache(fn) {
  const cache = new QuickLRU({
    maxSize: 100
  });

  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }

    const value = fn(arg);
    cache.set(arg, value);

    return value;
  };
}

const parsePath = wrapWithCache((path) => {
  return path
    .replace(/(\[|\])/g, ".")
    .split(".")
    .filter((part) => Boolean(part))
    .map((part) => {
      if (/^\d+$/.test(part)) {
        return parseInt(part);
      }
      return part;
    });
});
