import { getIterator } from './internals';

/* eslint-disable-next-line func-style */
export function *mapGenerator (iterable, fn) {
  const iterator = getIterator(iterable);

  for (let idx = 0; true; idx++) {
    const { done, value } = iterator.next();

    if (done) {
      break;
    } else {
      yield fn(value, idx, iterable);
    }
  }
}
