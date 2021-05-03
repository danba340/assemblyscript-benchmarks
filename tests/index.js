const assert = require("assert");
const { add, factorial, squareArray, squareArrayGen } = require("..");

assert.strictEqual(add(1, 2), 3);
console.log("add: ok");

assert.strictEqual(factorial(3), 6);
console.log("factorial: ok");

assert.deepStrictEqual(squareArray([1, 2]), new Int32Array([1, 4]));
console.log("squareArray: ok");

assert.deepStrictEqual(squareArrayGen(3), new Int32Array([0, 1, 4]));
console.log("squareArrayGen: ok");
