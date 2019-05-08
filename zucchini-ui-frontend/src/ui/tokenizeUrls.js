export default function tokenizeUrls(content) {
  if (!content) {
    return [];
  }

  const lines = content.trim().split("\n");
  const tokensForLines = lines.map(line => tokenizeLine(line).concat([["eol"]]));
  return tokensForLines.flatMap(lineTokens => lineTokens);
}

const urlPattern = new RegExp("(https?://[^ ]+)", "ig");
const specialChars = ",.;";

function tokenizeLine(content) {
  let tokens = [];

  let lastIndex = 0;
  let result;
  while ((result = urlPattern.exec(content)) !== null) {
    if (result.index > lastIndex) {
      tokens.push(["text", content.substring(lastIndex, result.index)]);
    }

    let url = result[1];
    let remaining = "";

    for (let i = 0; i < specialChars.length; i++) {
      const specialChar = specialChars[i];
      if (url.endsWith(specialChar)) {
        url = url.substring(0, url.length - 1);
        remaining = specialChar;
        break;
      }
    }

    tokens.push(["url", url]);
    if (remaining) {
      tokens.push(["text", remaining]);
    }

    lastIndex = result.index + result[0].length;
  }

  if (lastIndex < content.length) {
    tokens.push(["text", content.substring(lastIndex)]);
  }

  tokens = tokens.reduce((prevTokens, token) => {
    // Merge text tokens if possible
    if (prevTokens.length >= 1) {
      const lastToken = prevTokens[prevTokens.length - 1];
      if (lastToken[0] === "text" && token[0] === "text") {
        lastToken[1] += token[1];
        return prevTokens;
      }
    }

    // Add token to prev tokens
    prevTokens.push(token);
    return prevTokens;
  }, []);

  return tokens;
}
