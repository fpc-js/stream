import Stream from '../src/index.js';

/* eslint-disable no-magic-numbers */

const { range } = Stream;
const empty = range(1, 0);
const zero = range(0, 0);
const oneToThree = range(1, 3);

test('range(0, 0).map(x => x + 1) = [1]', () =>
  expect(zero.map(x => x + 1).toArray()).toEqual([1])
);

test('map works on empty streams', () =>
  expect(empty.map(x => x + 1).toArray()).toEqual([])
);

test('map works on streams', () =>
  expect(oneToThree.map(x => x * 2).toArray()).toEqual([2, 4, 6])
);

test('map respects Array.prototype.map interface', () => {
  const fn = jest.fn();
  const stream = oneToThree.map(fn);

  expect(fn.mock.calls.length).toBe(0);

  stream.toArray();
  expect(fn.mock.calls.length).toBe(3);
  expect(fn.mock.calls[0]).toEqual([1, 0, oneToThree]);
  expect(fn.mock.calls[1]).toEqual([2, 1, oneToThree]);
  expect(fn.mock.calls[2]).toEqual([3, 2, oneToThree]);
});
