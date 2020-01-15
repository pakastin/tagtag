import isTextLike from './is-text-like';
import { isHtmlVoidTag, isSvgVoidTag } from './void-tags';
import parseQuery from './parse-query';

export default function tag (query, ...args) {
  const { tagName, id, className } = parseQuery(query);
  let attributes = '';
  let content = '';

  if (id) {
    attributes += ` id="${id}"`;
  }

  if (className) {
    attributes += ` class="${className}"`;
  }

  args.forEach(arg => {
    if (isTextLike(arg)) {
      content += arg;
    } else if (typeof arg === 'object') {
      if (isTextLike(arg.el)) {
        content += arg;
      } else {
        for (const key in arg) {
          attributes += ` ${key}="${arg[key]}"`;
        }
      }
    }
  });

  if (tagName === 'doctype html') {
    return `<!DOCTYPE html>${content}`;
  }

  if (isHtmlVoidTag(tagName)) {
    return `<${tagName}${attributes}>`;
  } else if (isSvgVoidTag(tagName)) {
    return `<${tagName}${attributes}/>`;
  } else {
    return `<${tagName}${attributes}>${content}</${tagName}>`;
  }
}

tag.extend = function extendTag (tagName) {
  return function extendedTag (...args) {
    return tag(tagName, ...args);
  };
};
