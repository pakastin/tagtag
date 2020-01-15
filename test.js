const assert = require("assert");

describe("tagtag", () => {
  const tag = require("./dist/tagtag");
  const testCases = [
    [() => tag("h1")("Hello world!"), "<h1>Hello world!</h1>"],
    [() => tag(".hello")("world"), '<div class="hello">world</div>'],
    [() => tag("#hello.world")("!"), '<div id="hello" class="world">!</div>']
  ];

  testCases.forEach(([fn, result]) => {
    it(result, () => assert.equal(fn(), result));
  });
});
