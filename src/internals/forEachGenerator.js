/* eslint-disable-next-line func-style */
export function *forEachGenerator (iterable, fn) {
  let idx = 0;

  for (const value of iterable) {
    fn(value, idx, iterable);
    yield value;

    idx++;
  }
}
