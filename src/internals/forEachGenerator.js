import { getIterator } from './getIterator';

/* eslint-disable-next-line func-style */
export function *forEachGenerator (iterable, fn) {
  const iterator = getIterator(iterable);

  /* eslint-disable-next-line no-constant-condition */
  for (let idx = 0; true; idx++) {
    const { done, value } = iterator.next();

    if (done) {
      break;
    } else {
      fn(value, idx, iterable);
      yield value;
    }
  }
}
