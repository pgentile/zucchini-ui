import isString from "lodash/isString";

export default function tokenizeFromInfo(info) {
  const name = info.name;
  let previousOffset = 0;

  const tokens = [];
  const args = info.arguments || [];

  args
    .filter(arg => {
      // Ignorer les arguments non définis
      return isString(arg.value) && arg.value !== "";
    })
    .forEach(arg => {
      // Ajouter le contenu avant l'argument
      const before = name.substring(previousOffset, arg.offset);
      if (before.length > 0) {
        tokens.push({ type: "text", value: before });
      }

      // Extraire la valeur de l'argument
      tokens.push({ type: "arg", value: arg.value });

      previousOffset = arg.offset + arg.value.length;
    });

  // Ajouter le contenu restant
  const remaining = name.substring(previousOffset);
  if (remaining.length > 0) {
    tokens.push({ type: "text", value: remaining });
  }

  return tokens;
}
