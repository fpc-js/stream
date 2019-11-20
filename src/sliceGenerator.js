import { getIterator } from './internals';

/* eslint-disable-next-line func-style */
export function *sliceGenerator (iterable, begin, end) {
  const iterator = getIterator(iterable);

  for (let idx = 0; true; idx++) {
    const { done, value } = iterator.next();

    if (done || idx >= end) {
      break;
    } else if (idx >= begin) {
      yield value;
    }
  }
}
