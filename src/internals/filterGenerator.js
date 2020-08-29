import { getIterator } from './getIterator';

/* eslint-disable-next-line func-style */
export function *filterGenerator (iterable, fn) {
  const iterator = getIterator(iterable);

  for (let idx = 0; true; idx++) {
    const { done, value } = iterator.next();

    if (done) {
      break;
    } else if (fn(value, idx, iterable)) {
      yield value;
    }
  }
}
