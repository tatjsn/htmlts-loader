import converter from './converter';

module.exports = function (source) {
  this.cacheable();

  const callback = this.async();

  converter(source)
    .then(result => callback(null, result))
    .catch(err => callback(err));
}
