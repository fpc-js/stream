/* eslint-disable-next-line func-style */
export function *filterGenerator (iterable, fn) {
  let idx = 0;

  for (const value of iterable) {
    if (fn(value, idx, iterable)) {
      yield value;
    }

    idx++;
  }
}
