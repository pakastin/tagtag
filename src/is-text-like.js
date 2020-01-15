export default function isTextLike (arg) {
  return typeof arg === 'string' || typeof arg === 'number' || typeof arg === 'boolean' || arg instanceof Date;
}
