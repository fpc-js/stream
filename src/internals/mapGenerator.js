/* eslint-disable-next-line func-style */
export function *mapGenerator (iterable, fn) {
  let idx = 0;

  for (const value of iterable) {
    yield fn(value, idx, iterable);

    idx++;
  }
}
