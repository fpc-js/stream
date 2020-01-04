import { expectIterable } from '@fpc/types';
import { getIterator } from './internals';
import { Stream } from './Stream';

/* eslint-disable-next-line func-style */
function *iterableGenerator (iterable) {
  const iterator = getIterator(iterable);

  while (true) {
    const { done, value } = iterator.next();

    if (done) {
      break;
    } else {
      yield value;
    }
  }
}

export const fromIterable = iterable =>
  new Stream(iterableGenerator, expectIterable(iterable));
