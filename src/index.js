import isTextLike from './is-text-like';
import { isHtmlVoidTag, isSvgVoidTag } from './void-tags';
import parseQuery from './parse-query';
import escapeHTML from './escape-html';
import html from './html';
import svg from './svg';

class Element {
  constructor (output) {
    this.output = output;
  }

  toString () {
    return this.output;
  }
}

const queryCache = {};

export default function tag (query) {
  query = (queryCache[query] ? queryCache[query] : (query = queryCache[query] = parseQuery(query)));
  return function (...args) {
    const { tagName } = query;
    let { id, className } = query;
    const attributes = [];
    const content = [];

    args.forEach(arg => {
      if (isTextLike(arg)) {
        content.push(escapeHTML(arg));
      } else if (typeof arg === 'object') {
        if (arg instanceof Element) {
          content.push(arg.toString());
        } else {
          for (const key in arg) {
            if (key === 'id') {
              id = arg[key];
            } else if (key === 'class') {
              if (className) {
                className += ' ';
              }
              className += escapeHTML(arg[key]);
            } else if (key === '$raw') {
              content.push(arg[key]);
            } else {
              attributes.push(` ${key}="${escapeHTML(arg[key])}"`);
            }
          }
        }
      }
    });

    if (id) {
      attributes.push(` id="${id}"`);
    }

    if (className) {
      attributes.push(` class="${className}"`);
    }

    if (tagName === 'doctype html') {
      return `<!DOCTYPE html>${content.join('')}`;
    }

    if (isHtmlVoidTag(tagName)) {
      return new Element(`<${tagName}${attributes.join('')}>`);
    } else if (isSvgVoidTag(tagName)) {
      return new Element(`<${tagName}${attributes.join('')}/>`);
    } else {
      return new Element(`<${tagName}${attributes.join('')}>${content.join('')}</${tagName}>`);
    }
  };
}

tag.raw = function (str) {
  return new Element(str);
};

tag.html = html(tag);
tag.svg = svg(tag);

tag.queryCache = queryCache;
