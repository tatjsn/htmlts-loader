jest.unmock('../converter');

import converter from '../converter';
import Minimize from 'minimize';

Minimize.prototype.parse = jest.fn(
  (content, callback) => callback(null, `****`));

describe('converter', () => {
  it('converts all html strings', () => {
    const source = [
      'const a = 10;',
      'const b = `html',
      'b',
      '`;',
      'const c = 20;',
      'export const d = (x) => `html',
      'd${a + b + c}',
      '`;',
    ].join('\n');
    const expectedResult = [
      'const a = 10;',
      'const b = `****`;',
      'const c = 20;',
      'export const d = (x) => `****`;',
    ].join('\n');
    return converter(source)
      .then(result => expect(result).toEqual(expectedResult));
  });

  it('pass through source if no html string', () => {
    const source = [
      'const a = 10;',
      'const c = 20;',
    ].join('\n');
    const expectedResult = [
      'const a = 10;',
      'const c = 20;',
    ].join('\n');
    return converter(source)
      .then(result => expect(result).toEqual(expectedResult));
  });
});
