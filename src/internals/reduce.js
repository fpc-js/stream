import { empty } from './empty.js';

/* global Symbol */

/* eslint-disable-next-line max-statements */
export const reduce = (iterable, fn, initial) => {
  const iterator = iterable[Symbol.iterator]();

  let acc;
  let idx = 0;

  if (initial === empty) {
    const { done, value } = iterator.next();

    /* eslint-disable-next-line no-plusplus */
    idx++;

    if (done) {
      throw new TypeError('reduce of empty stream with no initial value');
    } else {
      acc = value;
    }
  } else {
    acc = initial;
  }

  /* eslint-disable-next-line no-constant-condition */
  for (; true; idx++) {
    const { done, value } = iterator.next();

    if (done) {
      break;
    } else {
      acc = fn(acc, value, idx, iterable);
    }
  }

  return acc;
};
