// ht https://github.com/component/escape-html/blob/b42947eefa79efff01b3fe988c4c7e7b051ec8d8/index.js
const replacements = {
  '"': "&quot;",
  "&": "&amp;",
  "'": "&#39;",
  "<": "&lt;",
  ">": "&gt;"
};
const escapesRe = /["'&<>]/g;

export default function escapeHTML(h) {
  return h.replace(escapesRe, s => replacements[s]);
}
