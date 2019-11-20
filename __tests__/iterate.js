import { iterate } from '../src';

/* eslint-disable no-magic-numbers */

test('iterate initial value is undefined by default', () =>
  expect(iterate(x => x).toArray()).toEqual([])
);

test('iterate stops on null', () =>
  expect(iterate(() => null).toArray()).toEqual([])
);

test('iterate creates infinite streams without a stop condition', () =>
  expect(iterate(x => x + 1, 0).slice(0, 3).toArray()).toEqual([1, 2, 3])
);

test('iterate creates finite streams with a stop condition', () =>
  expect(iterate(x => (x < 3 ? x + 1 : null), 0).toArray()).toEqual([1, 2, 3])
);

test('iterate applies the index to its function', () =>
  expect(iterate((_, i) => (i < 3 ? i : null)).toArray()).toEqual([0, 1, 2])
);
