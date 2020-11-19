/* eslint-disable-next-line func-style */
export function *sliceGenerator (iterable, begin, end) {
  let idx = 0;

  for (const value of iterable) {
    if (idx >= end) {
      break;
    } else if (idx >= begin) {
      yield value;
    }

    idx++;
  }
}
