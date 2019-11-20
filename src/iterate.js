import { Stream } from './Stream';

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
  new Stream(iterateGenerator, fn, initial);
