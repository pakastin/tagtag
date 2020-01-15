module.exports = function (filePath, options, callback) {
  try {
    const js = require(filePath);

    callback(null, String(js(options)));
  } catch (err) {
    callback(new Error(err));
  }
};
