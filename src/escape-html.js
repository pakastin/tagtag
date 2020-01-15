const replacements = {
  '"': '&quot;',
  '&': '&amp;',
  "'": '&#39;',
  '<': '&lt;',
  '>': '&gt;'
};
const escapesRe = /["'&<>]/g;

export default function escapeHTML (h) {
  return h.replace(escapesRe, s => replacements[s]);
}
