import { StreamGenerator } from './internals/StreamGenerator';

/* eslint-disable-next-line func-style */
function *rangeGenerator (start, end, step) {
  let curr = start;

  while (curr <= end) {
    yield curr;
    curr += step;
  }
}

export const range = (start = 0, end = Infinity, step = 1) =>
  new StreamGenerator(rangeGenerator, start, end, step);
