// The entry file of asbuild

export const Int32Array_ID = idof<Int32Array>();
export const Float64Array_ID = idof<Float64Array>();

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function factorial(i: i32): i32 {
  return i == 0 ? 1 : i * factorial(i - 1);
}

export function squareArray(arr: Int32Array): Int32Array {
  const len = arr.length;
  const result = new Int32Array(len);
  for (let i = 0; i < len; ++i) {
    const e = unchecked(arr[i]);
    unchecked(result[i] = e * e);
  }
  return result;
}

export function squareArrayGen(len: i32): Int32Array {
  const arr = new Int32Array(len).map((_,i) => i);
  const result = new Int32Array(len);
  for (let i = 0; i < len; ++i) {
    const e = unchecked(arr[i]);
    unchecked(result[i] = e * e);
  }
  return result;
}
