# JS module interpreter
[![Build Status](https://travis-ci.org/alejorod/extract.svg?branch=master)](https://travis-ci.org/alejorod/extract)
[![Coverage Status](https://coveralls.io/repos/github/alejorod/extract/badge.svg?branch=master)](https://coveralls.io/github/alejorod/extract?branch=master)
[![npm version](https://badge.fury.io/js/source-extractor.svg)](https://badge.fury.io/js/source-extractor)

Get the `exports` object from a stream, buffer, string or object representing a js module. *see [usage](#usage).*

### Installation

#### With npm:
```
npm install -save source-extract
```

> `extract` is meant to be used on a commonjs environment (or es6 through transpilation) such as the one `node` provides, is has **no browser support**

### Usage
````javascript
let extract = require('source-extract');

// from a string source
let source =  ```
module.exports = {
  name: 'Mike Wazowski'
};
```;

console.log(extract.from(source).name) // Mike Wazowski

// extracting specific keys from a string source
console.log(extract.from(source, 'name')); // Mike Wazowski

// Extracting from a readable Stream
let fs = require('fs');

extract
  .from(fs.createReadStream('path/to/file')) // extracting from streams returns a Promise
  .then((result) => {
    // assuming the content of the file is the same as source.
    console.log(result.name) // Mike Wazowski
  });

/**
 * Notes:
 *
 * - Extracting from Buffer and Objects works the same way as extracting from strings.
 * - Extracting from streams works with any kind of readable streams, such as http responses, read file streams, etc..
 */
````

### Documentation

| extract |
| :--- |
| **.from(String&#124;Buffer&#124;Object source, String key='') -> any** |
| Extracting from a string, buffer or object will retrieve the exported object of that module. If `key` is provided, then the `key` property of the exported object will be returned, the whole exported object will be returned otherwise.|
| **.from(stream.Readable source, String key='' ) -> Promise.{any}** |
| Extracting from a readable stream works the same as extracting from a string but instead of returning the exported object itself, it returns a promise which will pass on the exports when resolve.|

### Why?

The main goal of the package is to interpret js packages bundled on the run when on development. An example of such case would be server side rendering, when de server bundle is being watched and re-bundled when a file changes, we need to reinterpret the js bundle (which can come in any kind of format) on the run.
