# tagtag
Easy HTML templating with JS. Especially useful with Node.js!

# Install
`npm i tagtag`

# Usage
## Import / require
```js
// If you're using ES modules:
import tag from 'tagtag'

// If you're using CommonJS modules:
const tag = require('tagtag');
```
## tag(query, ...args)
```js
tag('h1', 'Hello world!'); // <h1>Hello world!</h1>
tag('.hello', 'world'); // <div class="hello">world</div>
tag('#hello.world', '!'); // <div id="hello" class="world"></div>
```

## tag.extend(query)
```js
const doc = tag.extend('doctype html');
const html = tag.extend('html');
const head = tag.extend('head');
const meta = tag.extend('meta');
const title = tag.extend('title');
const body = tag.extend('body');
const h1 = tag.extend('h1');

doc(
  html(
    head(
      meta({ charset: 'utf-8' }),
      title('Hello tagtag!')
    ),
    body(
      h1('Hello tagtag!')
    )
  )
) // <!DOCTYPE html><html><head><meta charset="utf-8"><title>Hello tagtag!</title></head><body><h1>Hello tagtag!</h1></body></html>
```
