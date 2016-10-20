import stream from 'stream';
import extract from './extract';

/**
 * Extracts exported `key` from stream.
 *
 * @param  {stream.Readable} stream
 * @param  {String} key      Named export to extract
 * @return {Promise.<*>}
 */
function fromStream(readStream, key='') {
  return new Promise((resolve, reject) => {
    let data = [];
    let dataLength = 0;
    let buffer;

    readStream.on('data', (chunk) => {
      data.push(chunk);
      dataLength += chunk.length;
    }).on('end', () => {
      buffer = new Buffer(dataLength);

      for (let i=0, pos=0; i < data.length; i++) {
        data[i].copy(buffer, pos);
        pos += data[i].length;
      }

      resolve(extract(buffer.toString(), key));
    });
  });
}

export default {
  /**
   * Extracts exported `key` from path. `path` can be a path to a module or
   * a string|Buffer|Stream of raw code.
   *
   * @param  {String|Buffer|Stream} path
   * @param  {String} key
   * @return {*}
   */
  from: (bundle, key='') => {
    if (bundle instanceof stream.Readable) {
      return fromStream(bundle, key);
    }

    return Buffer.isBuffer(bundle)
      ? extract(bundle.toString(), key)
      : extract(bundle, key);
  }
}
