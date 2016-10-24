# JS module interpreter
[![Build Status](https://travis-ci.org/alejorod/extract.svg?branch=master)](https://travis-ci.org/alejorod/extract)
[![Coverage Status](https://coveralls.io/repos/github/alejorod/extract/badge.svg?branch=master)](https://coveralls.io/github/alejorod/extract?branch=master)

Get the `exports` object from a stream, buffer, string or object representing a js module. *see [usage](#usage).*

### Installation

#### With npm:
```
npm install -save extract
```

> `extract` is meant to be used on a commonjs environment (or es6 through transpilation) such as the one `node` provides, is has **no browser support**

### Usage


### Documentation

| AsciiEmojiParser |
| :--- |
| **AsciiEmojiParser(str) -> AsciiEmojiParser** |
|`AsciiEmojiParser` constructor takes in a string representing the separator to distinguish keywords.|
| **AsciiEmojiParser::parse(str) -> str** |
|`parse` method takes in the text to be parsed and return the parsed text, that is the input text with all keywords enclosed by the parser separator replaced with ascii emojis.|
| **AsciiEmojiParser.getKeywords() -> Array[str]** |
|`getKeywords` static method returns all the supported keywords by the emoji parser.|
