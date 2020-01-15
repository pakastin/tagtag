export default function (filePath, options, callback) {
  try {
    const js = import(filePath);

    callback(null, String(js(options)));
  } catch (err) {
    callback(new Error(err));
  }
}
