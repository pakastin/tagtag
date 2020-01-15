import isTextLike from './is-text-like';
import { isHtmlVoidTag, isSvgVoidTag } from './void-tags';
import parseQuery from './parse-query';

export default function tag (query) {
  return function (...args) {
    const { tagName } = parseQuery(query);
    let { id, className } = parseQuery(query);
    const attributes = [];
    const content = [];

    args.forEach(arg => {
      if (isTextLike(arg)) {
        content.push(arg); // escape!
      } else if (typeof arg === 'object') {
        if (arg.toString) {
          content.push(arg.toString());
        } else {
          for (const key in arg) {
            if (key === 'id') {
              id = arg[key];
            } else if (key === 'class') {
              if (className) {
                className += ' ';
              }
              className += arg[key]; // escape!
            } else {
              attributes.push(` ${key}="${arg[key]}"`);
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
      return {
        toString () {
          return `<${tagName}${attributes.join('')}>`;
        }
      };
    } else if (isSvgVoidTag(tagName)) {
      return {
        toString () {
          return `<${tagName}${attributes.join('')}/>`;
        }
      };
    } else {
      return {
        toString () {
          return `<${tagName}${attributes.join('')}>${content.join('')}</${tagName}>`;
        }
      };
    }
  };
}

tag.raw = function (str) {
  return {
    toString () { return str; }
  };
};

console.log(
  String(tag('h1')({ raw: '<script>Hello world!</script>' }))
);
