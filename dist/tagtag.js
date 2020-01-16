(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.tagtag = factory());
}(this, (function () { 'use strict';

  function isTextLike (arg) {
    return typeof arg === 'string' || typeof arg === 'number' || typeof arg === 'boolean' || arg instanceof Date;
  }

  var htmlVoidTags = [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ];

  var svgVoidTags = [
    'circle',
    'ellipse',
    'line',
    'path',
    'polygon',
    'polyline',
    'rect',
    'stop',
    'use'
  ];

  var htmlVoidTagLookup = htmlVoidTags.reduce(function (lookup, tagName) {
    lookup[tagName] = true;
    return lookup;
  }, {});

  var svgVoidTagLookup = svgVoidTags.reduce(function (lookup, tagName) {
    lookup[tagName] = true;
    return lookup;
  }, {});

  function isHtmlVoidTag (tagName) {
    return htmlVoidTagLookup[tagName] || false;
  }

  function isSvgVoidTag (tagName) {
    return svgVoidTagLookup[tagName] || false;
  }

  function parseQuery (query) {
    var chunks = query.split(/([#.])/);
    var tagName = '';
    var id = '';
    var classNames = [];

    for (var i = 0; i < chunks.length; i++) {
      var chunk = chunks[i];
      if (chunk === '#') {
        id = chunks[++i];
      } else if (chunk === '.') {
        classNames.push(chunks[++i]);
      } else if (chunk.length) {
        tagName = chunk;
      }
    }

    return {
      tagName: tagName || 'div',
      id: id,
      className: classNames.join(' ')
    };
  }

  var replacements = {
    '"': '&quot;',
    '&': '&amp;',
    "'": '&#39;',
    '<': '&lt;',
    '>': '&gt;'
  };
  var escapesRe = /["'&<>]/g;

  function escapeHTML (h) {
    return h.replace(escapesRe, function (s) { return replacements[s]; });
  }

  function html (tag) { return [
    'a',
    'abbr',
    'address',
    'area',
    'article',
    'aside',
    'audio',
    'b',
    'base',
    'bdi',
    'bdo',
    'blockquote',
    'body',
    'br',
    'button',
    'canvas',
    'caption',
    'cite',
    'code',
    'col',
    'colgroup',
    'data',
    'datalist',
    'dd',
    'del',
    'details',
    'dfn',
    'dialog',
    'div',
    'dl',
    'dt',
    'em',
    'embed',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hgroup',
    'hr',
    'html',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'legend',
    'li',
    'link',
    'main',
    'map',
    'mark',
    'math',
    'menu',
    'menuitem',
    'meta',
    'meter',
    'nav',
    'noscript',
    'object',
    'ol',
    'optgroup',
    'option',
    'output',
    'p',
    'param',
    'picture',
    'pre',
    'progress',
    'q',
    'rb',
    'rp',
    'rt',
    'rtc',
    'ruby',
    's',
    'samp',
    'script',
    'section',
    'select',
    'slot',
    'small',
    'source',
    'span',
    'strong',
    'style',
    'sub',
    'summary',
    'sup',
    'svg',
    'table',
    'tbody',
    'td',
    'template',
    'textarea',
    'tfoot',
    'th',
    'thead',
    'time',
    'title',
    'tr',
    'track',
    'u',
    'ul',
    'var',
    'video',
    'wbr'
  ].reduce(function (html, tagName) {
    Object.defineProperty(html, tagName, {
      enumerable: true,
      get: function get () {
        return tag(tagName);
      }
    });
    return html;
  }, {
    doctype: {
      get: function get () {
        return tag('doctype html');
      }
    }
  }); }

  function svg (tag) { return [
    'a',
    'altGlyph',
    'altGlyphDef',
    'altGlyphItem',
    'animate',
    'animateColor',
    'animateMotion',
    'animateTransform',
    'animation',
    'audio',
    'canvas',
    'circle',
    'clipPath',
    'color-profile',
    'cursor',
    'defs',
    'desc',
    'discard',
    'ellipse',
    'feBlend',
    'feColorMatrix',
    'feComponentTransfer',
    'feComposite',
    'feConvolveMatrix',
    'feDiffuseLighting',
    'feDisplacementMap',
    'feDistantLight',
    'feDropShadow',
    'feFlood',
    'feFuncA',
    'feFuncB',
    'feFuncG',
    'feFuncR',
    'feGaussianBlur',
    'feImage',
    'feMerge',
    'feMergeNode',
    'feMorphology',
    'feOffset',
    'fePointLight',
    'feSpecularLighting',
    'feSpotLight',
    'feTile',
    'feTurbulence',
    'filter',
    'font',
    'font-face',
    'font-face-format',
    'font-face-name',
    'font-face-src',
    'font-face-uri',
    'foreignObject',
    'g',
    'glyph',
    'glyphRef',
    'handler',
    'hkern',
    'iframe',
    'image',
    'line',
    'linearGradient',
    'listener',
    'marker',
    'mask',
    'metadata',
    'missing-glyph',
    'mpath',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'prefetch',
    'radialGradient',
    'rect',
    'script',
    'set',
    'solidColor',
    'stop',
    'style',
    'svg',
    'switch',
    'symbol',
    'tbreak',
    'text',
    'textArea',
    'textPath',
    'title',
    'tref',
    'tspan',
    'unknown',
    'use',
    'video',
    'view',
    'vkern'
  ].reduce(function (svg, tagName) {
    Object.defineProperty(svg, tagName, {
      enumerable: true,
      get: function get () {
        return tag(tagName);
      }
    });
    return svg;
  }, {}); }

  var Element = function Element (output) {
    this.output = output;
  };

  Element.prototype.toString = function toString () {
    return this.output;
  };

  var queryCache = {};

  function tag (query) {
    query = (queryCache[query] ? queryCache[query] : (query = queryCache[query] = parseQuery(query)));
    return function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var tagName = query.tagName;
      var id = query.id;
      var className = query.className;
      var attributes = [];
      var content = [];

      args.forEach(function (arg) {
        if (isTextLike(arg)) {
          content.push(escapeHTML(arg));
        } else if (typeof arg === 'object') {
          if (arg instanceof Element) {
            content.push(arg.toString());
          } else {
            for (var key in arg) {
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
                attributes.push((" " + key + "=\"" + (escapeHTML(arg[key])) + "\""));
              }
            }
          }
        }
      });

      if (id) {
        attributes.push((" id=\"" + id + "\""));
      }

      if (className) {
        attributes.push((" class=\"" + className + "\""));
      }

      if (tagName === 'doctype html') {
        return ("<!DOCTYPE html>" + (content.join('')));
      }

      if (isHtmlVoidTag(tagName)) {
        return new Element(("<" + tagName + (attributes.join('')) + ">"));
      } else if (isSvgVoidTag(tagName)) {
        return new Element(("<" + tagName + (attributes.join('')) + "/>"));
      } else {
        return new Element(("<" + tagName + (attributes.join('')) + ">" + (content.join('')) + "</" + tagName + ">"));
      }
    };
  }

  tag.raw = function (str) {
    return new Element(str);
  };

  tag.html = html(tag);
  tag.svg = svg(tag);

  tag.queryCache = queryCache;

  return tag;

})));
