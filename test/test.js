import fs from 'fs';
import path from 'path';
import { assert } from 'chai';
import extract from '../src/index';

let message = 'hello world';
let code = `
  var message = '${message}';
  module.exports = {
    message: message,
    log: function() {
      return message;
    }
  }
`;
var bufferSource = new Buffer(code, "utf-8")
let filePath = path.join(__dirname, 'test-file');
let objSource = {
  message,
  log: () => message
};

describe('Extract', function() {
  describe('# from - with string source', function() {
    it('should extract `message` key', function() {
      assert.strictEqual(message, extract.from(code, 'message'));
    });

    it('should extract `log` key', function() {
      assert.strictEqual(message, extract.from(code, 'log')());
    });

    it('should extract all exports when no key is provided', function() {
      let exp = extract.from(code);
      assert.strictEqual(message, exp.message);
      assert.strictEqual(message, exp.log());
    });
  });

  describe('# from - with stream source', function() {
    it('should extract `message` key', function(done) {
      extract.from(fs.createReadStream(filePath), 'message').then((extractedMessage) => {
        assert.strictEqual(message, extractedMessage);
        done();
      }).catch((err) => done(err));
    });

    it('should extract `log` key', function(done) {
      extract.from(fs.createReadStream(filePath), 'log').then((extractedLog) => {
        assert.strictEqual(message, extractedLog());
        done();
      }).catch((err) => done(err));;
    });

    it('should extract all exports when no key is provided', function(done) {
      extract.from(fs.createReadStream(filePath)).then((exp) => {
        assert.strictEqual(message, exp.message);
        assert.strictEqual(message, exp.log());
        done();
      }).catch((err) => done(err));;
    });
  });

  describe('# from - with object source', function() {
    it('should extract `message` key', function() {
      assert.strictEqual(message, extract.from(objSource, 'message'));
    });

    it('should extract `log` key', function() {
      assert.strictEqual(message, extract.from(objSource, 'log')());
    });

    it('should extract all exports when no key is provided', function() {
      let exp = extract.from(objSource);
      assert.strictEqual(message, exp.message);
      assert.strictEqual(message, exp.log());
    });
  });

  describe('# from - with buffer source', function() {
    it('should extract `message` key', function() {
      assert.strictEqual(message, extract.from(bufferSource, 'message'));
    });

    it('should extract `log` key', function() {
      assert.strictEqual(message, extract.from(bufferSource, 'log')());
    });

    it('should extract all exports when no key is provided', function() {
      let exp = extract.from(bufferSource);
      assert.strictEqual(message, exp.message);
      assert.strictEqual(message, exp.log());
    });
  });
});
