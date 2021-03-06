# TagTag
Easy HTML templating with JS. Tagtag prints out HTML string, so it's especially useful with Node.js (works in browsers as well).

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

## Using with express
```js
// views/index.js

const tag = require('tagtag');
const { doctype, html, head, meta, title, body, h1 } = tag.html;

module.exports = ({ name }) => doctype(
  html(
    head(
      meta({ charset: 'utf-8' }),
      title(`Hello ${name}`)
    ),
    body(
      h1(`Hello ${name}`)
    )
  )
);
```

```js
// server.js

const express = require('express');

const app = express();

app.engine('js', require('tagtag/express'));
app.set('views', 'views');
app.set('view engine', 'js');

app.get('/', (req, res, next) => {
  res.render('index', { name: 'tagtag' });
});
```

## tag(query)(...args)
```js
tag('h1')('Hello world!').toString(); // <h1>Hello world!</h1>
String(tag('.hello')('world')); // <div class="hello">world</div>
String(tag('#hello.world')('!')); // <div id="hello" class="world">!</div>
```

```js
const { doctype, html, head, meta, title, body, h1 } = tag.html;

String(doctype(
  html(
    head(
      meta({ charset: 'utf-8' }),
      title('Hello tagtag!')
    ),
    body(
      h1('Hello tagtag!')
    )
  )
)) // <!DOCTYPE html><html><head><meta charset="utf-8"><title>Hello tagtag!</title></head><body><h1>Hello tagtag!</h1></body></html>
```

## tag.html[tagName]
This gives you shortcut to `tag(tagName)` for the standard HTML tag names.

## tag.svg[tagName]
This gives you shortcut to `tag(tagName)` for the standard SVG tag names.

## Self-closing tags
Self-closing tags are detected automatically.

## Escaping
Notice tagtag escapes text content and attributes by default! If you want to print out raw text, please use:
```js
String(body(tag.raw('<script alert("Evil!")</script>'));
```

or:
```js
String(body({ $raw: '<script alert("Evil!")</script>' }));
```
