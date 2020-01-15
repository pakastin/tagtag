export default async function (filePath, options, callback) {
  try {
    const js = await import(filePath);

    callback(null, String(js(options)));
  } catch (err) {
    callback(new Error(err));
  }
}
