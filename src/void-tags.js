export const htmlVoidTags = [
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

export const svgVoidTags = [
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

const htmlVoidTagLookup = htmlVoidTags.reduce((lookup, tagName) => {
  lookup[tagName] = true;
  return lookup;
}, {});

const svgVoidTagLookup = svgVoidTags.reduce((lookup, tagName) => {
  lookup[tagName] = true;
  return lookup;
}, {});

export function isHtmlVoidTag (tagName) {
  return htmlVoidTagLookup[tagName] || false;
}

export function isSvgVoidTag (tagName) {
  return svgVoidTagLookup[tagName] || false;
}
