var Minimize = require('minimize');
var minimize = new Minimize();
var parse = function(content) {
  return new Promise(function(resolve, reject) {
    minimize.parse(content, function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
var passthru = function(content) {
  return new Promise(function(resolve) {
    resolve(content);
  });
}

module.exports = function(source) {
  this.cacheable();
  var callback = this.async();
  var splits = source.split(/(`html\n[\s\S]*?\n)(?=`)/);

  Promise.all(splits.map(function(split) {
    if (split.startsWith('`html\n')) {
      return parse('`' + split.substr(6));
    } else {
      return passthru(split);
    }
  })).then(function(results) {
    callback(null, results.join(''));
  }).catch(function(err) {
    callback(err);
  });
}
