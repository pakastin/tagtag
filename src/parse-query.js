export default function parseQuery (query) {
  let isId = false;
  let isClass = false;
  let tagName = '';
  let id = '';
  let className = '';

  for (var i = 0; i < query.length; i++) {
    const char = query[i];

    if (char === '.') {
      isClass = true;
      isId = false;

      if (className.length > 0) {
        className += ' ';
      }
    } else if (char === '#') {
      isId = true;
      isClass = false;
    } else if (isId) {
      id += char;
    } else if (isClass) {
      className += char;
    } else {
      tagName += char;
    }
  }

  return {
    tagName: tagName || 'div',
    id,
    className
  };
}
