import { getIterator } from './internals';

export const consume = iterable => {
  const iterator = getIterator(iterable);

  /* eslint-disable no-constant-condition */
  while (true) {
    const { done } = iterator.next();

    if (done) {
      break;
    }
  }
};
