import Stream from '../src/index.js';

/* eslint-disable no-magic-numbers */

const { fromArrayLike } = Stream;

test('fromArrayLike({ length: 0 }) is an empty stream', () =>
  expect(fromArrayLike({ length: 0 }).toArray()).toEqual([])
);

test('fromArrayLike({ length: 1, 0: 0 }) = [0]', () =>
  expect(fromArrayLike({ length: 1, 0: 0 }).toArray()).toEqual([0])
);

test('fromArrayLike({ length: 2, 0: 0, 1: 1 }) = [0, 1]', () =>
  expect(fromArrayLike({ length: 2, 0: 0, 1: 1 }).toArray()).toEqual([0, 1])
);

test('fromArrayLike({ length: 2, 0: 0, 1: 1 }).map(x => x + 1) = [1, 2]', () =>
  expect(fromArrayLike({ length: 2, 0: 0, 1: 1 })
    .map(x => x + 1).toArray()).toEqual([1, 2])
);
