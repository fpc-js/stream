import { range } from '../src';

/* eslint-disable no-magic-numbers */

test('range(1, 0) is an empty stream', () =>
  expect(range(1, 0).toArray()).toEqual([])
);

test('range(0, 0) = [0]', () =>
  expect(range(0, 0).toArray()).toEqual([0])
);

test('range(0, 1) = [0, 1]', () =>
  expect(range(0, 1).toArray()).toEqual([0, 1])
);

test('range third parameter is the step', () =>
  expect(range(1, 10, 2).toArray()).toEqual([1, 3, 5, 7, 9])
);
