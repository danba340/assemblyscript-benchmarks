const fs = require("fs");
const loader = require("@assemblyscript/loader");

const wasmModule = loader.instantiateSync(
  fs.readFileSync(__dirname + "/build/mywasm.wasm")
);

function squareArray(array) {
  const {
    __newArray,
    __getInt32Array,

    Int32Array_ID,
    squareArray,
  } = wasmModule.exports;

  const arr = __newArray(Int32Array_ID, array);

  const result = __getInt32Array(squareArray(arr));

  return result;
}

function squareArrayGen(len) {
  const {
    __getInt32Array,

    squareArrayGen,
  } = wasmModule.exports;

  const result = __getInt32Array(squareArrayGen(len));

  return result;
}

module.exports = {
  ...wasmModule.exports,
  squareArray,
  squareArrayGen
};
