# ES6 template strings HTML minifier for webpack

Minify this:
```js
const x = `html
<div>
  <a>${link}</a>
</div>
`
```

to this:
```js
const x = `<div><a>${link}<a></div>`
```
