import Stream from '../src/index.js';
import { jest } from '@jest/globals';

/* eslint-disable no-magic-numbers */

const { range } = Stream;
const empty = range(1, 0);
const zero = range(0, 0);
const oneToThree = range(1, 3);

test('range(0, 0).filter(x => x !== 0) = []', () =>
  expect(zero.filter(x => x !== 0).toArray()).toEqual([])
);

test('zero.filter(x => x === 0) = [0]', () =>
  expect(zero.filter(x => x === 0).toArray()).toEqual([0])
);

test('range(1, 3).filter(x => x > 1) = [2, 3]', () =>
  expect(oneToThree.filter(x => x > 1).toArray()).toEqual([2, 3])
);

test('filter method works on empty streams', () =>
  expect(empty.filter(x => x % 2 === 0).toArray()).toEqual([])
);

test('filter method works on streams', () =>
  expect(oneToThree.filter(x => x % 2 === 0).toArray()).toEqual([2])
);

test('filter respects Array.prototype.filter interface', () => {
  const fn = jest.fn();
  const stream = oneToThree.filter(fn);

  expect(fn.mock.calls.length).toBe(0);

  stream.toArray();
  expect(fn.mock.calls.length).toBe(3);
  expect(fn.mock.calls[0]).toEqual([1, 0, oneToThree]);
  expect(fn.mock.calls[1]).toEqual([2, 1, oneToThree]);
  expect(fn.mock.calls[2]).toEqual([3, 2, oneToThree]);
});
