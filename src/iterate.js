import { expectFunction } from '@fpc/types';
import { StreamGenerator } from './internals/StreamGenerator.js';

/* eslint-disable func-style, no-plusplus */
function *iterateGenerator (fn, initial) {
  let idx = 0;
  let acc = initial == null ? fn(initial, idx++) : initial;

  while (true) {
    if (acc == null) {
      break;
    } else {
      yield acc;
    }

    acc = fn(acc, idx++);
  }
}

export const iterate = (fn, initial) =>
  new StreamGenerator(iterateGenerator, expectFunction(fn), initial);
