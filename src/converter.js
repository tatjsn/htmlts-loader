import Minimize from 'minimize';

const parse = match => new Promise((resolve, reject) => {
  const minimize = new Minimize();
  minimize.parse(match[0].slice(6, -2), (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve({ [match.index]: `\`${data}\`` });
    }
  });
});

export default source => {
  const re = /`html\n[\s\S]*?\n`/g;
  const matches = [];
  let found;

  while (found = re.exec(source)) {
    matches.push(found);
  }

  if (matches.length === 0) {
    return Promise.resolve(source);
  }

  return Promise
    .all(matches.map(match => parse(match)))
    .then(results => Object.assign({}, ...results))
    .then(dict => source.replace(re, (x, offset) => dict[offset]))
};
