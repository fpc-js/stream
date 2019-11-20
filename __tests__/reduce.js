import { range } from '../src';

/* eslint-disable no-magic-numbers */

const empty = range(1, 0);
const zero = range(0, 0);
const oneToFour = range(1, 4);
const twoToFive = range(2, 5);
const zeroToTen = range(0, 10);

test('range(0, 0).reduce((x, y) => x + y) = 0', () =>
  expect(zero.reduce((x, y) => x + y)).toBe(0)
);

test('range(0, 0).reduce((x, y) => x + y, 1) = 1', () =>
  expect(zero.reduce((x, y) => x + y, 1)).toBe(1)
);

test('reduce method works on empty streams', () => {
  const err = new Error('reduce of empty stream with no initial value');
  expect(() => empty.reduce((x, y) => x + y)).toThrow(err);

  expect(empty.reduce(x => x, undefined)).toBe(undefined);
  expect(empty.reduce((x, y) => x + y, 1)).toBe(1);
});

test('reduce method works on streams', () =>
  expect(zeroToTen.reduce((x, y) => x + y)).toBe(55)
);

test('reduce method respects Array.prototype.reduce interface', () => {
  const fn1 = jest.fn((x, y) => x + y);

  expect(oneToFour.reduce(fn1)).toBe(10);
  expect(fn1.mock.calls.length).toBe(3);
  expect(fn1.mock.calls[0]).toEqual([1, 2, 1, oneToFour]);
  expect(fn1.mock.calls[1]).toEqual([3, 3, 2, oneToFour]);
  expect(fn1.mock.calls[2]).toEqual([6, 4, 3, oneToFour]);

  const fn2 = jest.fn((x, y) => x + y);

  expect(twoToFive.reduce(fn2, 1)).toBe(15);
  expect(fn2.mock.calls.length).toBe(4);
  expect(fn2.mock.calls[0]).toEqual([1, 2, 0, twoToFive]);
  expect(fn2.mock.calls[1]).toEqual([3, 3, 1, twoToFive]);
  expect(fn2.mock.calls[2]).toEqual([6, 4, 2, twoToFive]);
  expect(fn2.mock.calls[3]).toEqual([10, 5, 3, twoToFive]);
});
