const Benchmark = require("benchmark");
const wasm = require(".");

function runSuite(suite) {
  console.log(`\nBenchmarking ${suite.name}:`);

  suite
    .on("cycle", function (event) {
      console.log(String(event.target));
    })
    .on("complete", function () {
      console.log(this.filter("fastest").map("name") + " is faster");
    })
    .run();
}

function addTest() {
  function addJs(a, b) {
    return a + b;
  }
  const addAs = wasm.add;

  const test = new Benchmark.Suite("add");

  test
    .add("AssemblyScript", function () {
      addAs(1, 2);
    })
    .add("JavaScript", function () {
      addJs(1, 2);
    });
  runSuite(test);
}

function factorialTest() {
  function factorialJs(i) {
    return i == 0 ? 1 : i * factorialJs(i - 1);
  }
  const factorialAs = wasm.factorial;

  const factorialLarge = new Benchmark.Suite("factorialLarge");

  factorialLarge
    .add("AssemblyScript", function () {
      factorialAs(20);
    })
    .add("JavaScript", function () {
      factorialJs(20);
    });
  runSuite(factorialLarge);

  const factorialSmall = new Benchmark.Suite("factorialSmall");

  factorialSmall
    .add("AssemblyScript", function () {
      factorialAs(2);
    })
    .add("JavaScript", function () {
      factorialJs(2);
    });
  runSuite(factorialSmall);
}

function squareArrayTest() {
  function squareArrayJs(arr) {
    const len = arr.length;
    const result = new Int32Array(len);
    for (let i = 0; i < len; ++i) {
      const e = arr[i];
      result[i] = e * e;
    }
    return result;
  }
  const squareArrayAs = wasm.squareArray;

  const arrayLargeTest = new Benchmark.Suite("squareArrayLarge");

  const arrayLarge = new Int32Array(200).map((_, i) => i);

  arrayLargeTest
    .add("AssemblyScript", function () {
      squareArrayAs(arrayLarge);
    })
    .add("JavaScript", function () {
      squareArrayJs(arrayLarge);
    });
  runSuite(arrayLargeTest);

  const arraySmallTest = new Benchmark.Suite("squareArraySmall");

  const arraySmall = new Int32Array(20).map((_, i) => i);

  arraySmallTest
    .add("AssemblyScript", function () {
      squareArrayAs(arraySmall);
    })
    .add("JavaScript", function () {
      squareArrayJs(arraySmall);
    });
  runSuite(arraySmallTest);
}

function squareArrayGenTest() {
  function squareArrayGenJs(len) {
    const arr = new Int32Array(len).map((_, i) => i);
    const result = new Int32Array(len);
    for (let i = 0; i < len; ++i) {
      const e = arr[i];
      result[i] = e * e;
    }
    return result;
  }
  const squareArrayGenAs = wasm.squareArrayGen;

  const arrayLargeTest = new Benchmark.Suite("squareArrayGenLarge");

  arrayLargeTest
    .add("AssemblyScript", function () {
      squareArrayGenAs(200);
    })
    .add("JavaScript", function () {
      squareArrayGenJs(200);
    });
  runSuite(arrayLargeTest);

  const arraySmallTest = new Benchmark.Suite("squareArrayGenSmall");

  arraySmallTest
    .add("AssemblyScript", function () {
      squareArrayGenAs(20);
    })
    .add("JavaScript", function () {
      squareArrayGenJs(20);
    });
  runSuite(arraySmallTest);
}

addTest();
factorialTest();
squareArrayTest();
squareArrayGenTest();
