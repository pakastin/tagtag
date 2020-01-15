export default function parseQuery(query) {
  const chunks = query.split(/([#.])/);
  let tagName = "";
  let id = "";
  let classNames = [];

  for (var i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    if (chunk === "#") {
      id = chunks[++i];
    } else if (chunk === ".") {
      classNames.push(chunks[++i]);
    } else if (chunk.length) {
      tagName = chunk;
    }
  }

  return {
    tagName: tagName || "div",
    id,
    className: classNames.join(" ")
  };
}
