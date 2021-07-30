import Stream from '../src/index.js';

/* eslint-disable no-magic-numbers */

const { range } = Stream;

test('range(1, 0) is an empty stream', () =>
  expect(range(1, 0).toArray()).toEqual([])
);

test('range(0, 0) = [0]', () =>
  expect(range(0, 0).toArray()).toEqual([0])
);

test('range(0, 1) = [0, 1]', () =>
  expect(range(0, 1).toArray()).toEqual([0, 1])
);

test('range third parameter is the step', () => {
  expect(range(1, 10, 2).toArray()).toEqual([1, 3, 5, 7, 9]);
  expect(range(1, 10, 3).toArray()).toEqual([1, 4, 7, 10]);
});

test('range() creates an infinite stream starting from zero', () =>
  expect(range().slice(0, 5).toArray()).toEqual([0, 1, 2, 3, 4])
);

test('range second argument is infinite by default', () =>
  expect(range(2).slice(0, 3).toArray()).toEqual([2, 3, 4])
);
