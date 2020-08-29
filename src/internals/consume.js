import { getIterator } from './getIterator';

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
