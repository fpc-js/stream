import { range } from '../src';

/* eslint-disable no-magic-numbers */

const empty = range(1, 0);
const zero = range(0, 0);
const oneToThree = range(1, 3);

test('range(0, 0).forEach(x => x + 1) = [0]', () =>
  expect(zero.forEach(x => x + 1).toArray()).toEqual([0])
);

test('forEach method works on empty streams', () => {
  const res = empty.forEach(() => {
    throw new Error('This function should not be called');
  });

  expect(res).toEqual(empty);
});

test('forEach method works on streams', () => {
  const fn = jest.fn();
  const stream = oneToThree.forEach(fn);

  expect(fn.mock.calls.length).toBe(0);

  stream.toArray();
  expect(fn.mock.calls.length).toBe(3);
});

test('forEach respects Array.prototype.forEach interface', () => {
  const fn = jest.fn();
  const stream = oneToThree.forEach(fn);

  expect(fn.mock.calls.length).toBe(0);

  stream.toArray();
  expect(fn.mock.calls.length).toBe(3);
  expect(fn.mock.calls[0]).toEqual([1, 0, oneToThree]);
  expect(fn.mock.calls[1]).toEqual([2, 1, oneToThree]);
  expect(fn.mock.calls[2]).toEqual([3, 2, oneToThree]);
});
