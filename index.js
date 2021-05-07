const fs = require("fs");
const loader = require("@assemblyscript/loader");
const imports = { /* imports go here */ };
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), imports);

function squareArray(array) {
    const { __newArray, __getInt32Array, Int32Array_ID, squareArray: wasmSquareArray } = wasmModule.exports

    const typedArray = __newArray(Int32Array_ID, array)

    const result = __getInt32Array(wasmSquareArray(typedArray));
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
}
