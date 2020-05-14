import { expectFunction } from '@fpc/types';
import { StreamGenerator } from './StreamGenerator';

/* eslint-disable-next-line func-style */
function *iterateGenerator (fn, initial) {
  let acc = initial;

  for (let idx = 0; true; idx++) {
    acc = fn(acc, idx);

    if (acc == null) {
      break;
    } else {
      yield acc;
    }
  }
}

export const iterate = (fn, initial) =>
  new StreamGenerator(iterateGenerator, expectFunction(fn), initial);
