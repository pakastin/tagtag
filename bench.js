const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();
const tag = require("./dist/tagtag");

suite.add("1", () => tag("h1")("Hello world!"));
suite.add("2", () => tag(".hello")("world"));
suite.add("3", () => tag("#hello.world")("!"));

const t1 = tag("h1");
const t2 = tag(".hello");
const t3 = tag("#hello.world");
suite.add("1r", () => t1("Hello world!"));
suite.add("2r", () => t2("world"));
suite.add("3r", () => t3("!"));

if (process.argv.includes("timetest")) {
  const t0 = process.hrtime.bigint();
  for (var i = 0; i < 1000000; i++) {
    suite.forEach(b => b.fn());
  }
  const t1 = process.hrtime.bigint();
  console.log(t1 - t0);
} else {
  suite.on("cycle", event => console.log(event.target.toString()));
  suite.run({ async: true });
}
