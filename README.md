# ES6 template strings HTML minifier for webpack

[![Version npm][version]](http://browsenpm.org/package/htmlts-loader)

[version]: http://img.shields.io/npm/v/htmlts-loader.svg?style=flat-square

htmlts-loader minify HTML string using [minimize](https://github.com/Swaagie/minimize), designed to preprocess ES6 template string wrapped with `` `html\n `` and `` \n` ``.

This idea is inspired by github markdown syntax highlighting language identifier.

Minify this:
```js
const x = `html
<div class="app">
  <a>${link}</a>
</div>
`
```

to this:
```js
const x = `<div class=app><a>${link}</a></div>`
```
