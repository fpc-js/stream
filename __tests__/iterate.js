import Stream from '../src/index.js';

/* eslint-disable no-magic-numbers */

const { iterate } = Stream;

test('iterate initial value is undefined by default', () =>
  expect(iterate(x => x).toArray()).toEqual([])
);

test('iterate stops on null', () =>
  expect(iterate(() => null).toArray()).toEqual([])
);

test('iterate creates infinite streams without a stop condition', () =>
  expect(iterate(x => x + 1, 0).slice(0, 3).toArray()).toEqual([0, 1, 2])
);

test('iterate creates finite streams with a stop condition', () =>
  expect(iterate(x => (x < 2 ? x + 1 : null), 0).toArray()).toEqual([0, 1, 2])
);

test('iterate applies the index to its function', () =>
  expect(iterate((_, i) => (i < 3 ? i : null)).toArray()).toEqual([0, 1, 2])
);

const fibonacciSequence = iterate(([fst, snd]) => [snd, fst + snd], [0, 1])
  .map(([fst]) => fst);

test('iterate puts the initial value in the stream if is not null', () =>
  expect(fibonacciSequence.slice(0, 4).toArray()).toEqual([0, 1, 1, 2])
);
