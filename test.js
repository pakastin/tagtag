/* global describe, it */

const assert = require('assert');

describe('tagtag', () => {
  const tag = require('./dist/tagtag');
  const testCases = [
    [() => String(tag.html.doctype()), '<!DOCTYPE html>'],
    [() => String(tag('h1')('Hello world!')), '<h1>Hello world!</h1>'],
    [() => String(tag('.hello')('world')), '<div class="hello">world</div>'],
    [() => String(tag('#hello.world')('!')), '<div id="hello" class="world">!</div>'],
    [() => String(tag('hello')('<script>alert("evil")</script>')), '<hello>&lt;script&gt;alert(&quot;evil&quot;)&lt;/script&gt;</hello>']
  ];

  testCases.forEach(([fn, result]) => {
    it(result, () => assert.strictEqual(fn(), result));
  });
});
