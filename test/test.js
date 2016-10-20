import { assert } from 'chai';
import extract from '../src/index';

let message = 'hello world';
let code = `
  let message = '${message}';
  module.exports = {
    message: message,
    log: function() {
      return message;
    }
  }
`;

describe('Extract', function() {
  describe('# from - with string source', function() {
    it('should extract `message` key from code string', function() {
      assert.strictEqual(message, extract.from(code, 'message'));
    });

    it('should extract `log` key from code string', function() {
      assert.strictEqual(message, extract.from(code, 'message'));
    });

    it('should extract all exports when no key is provided', function() {
      let exp = extract.from(code);
      assert.strictEqual(message, exp.message);
      assert.strictEqual(message, exp.log());
    });
  });
});
