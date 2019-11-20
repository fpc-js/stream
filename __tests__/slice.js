import { range } from '../src';

/* eslint-disable no-magic-numbers */

const empty = range(1, 0);
const zero = range(0, 0);
const zeroOne = range(0, 1);
const zeroToTen = range(0, 10);

test('stream.slice() works on empty streams', () => {
  expect(empty.slice(0, 0).toArray()).toEqual([]);
  expect(empty.slice(0, 1).toArray()).toEqual([]);
  expect(empty.slice(1, 0).toArray()).toEqual([]);
});

test('stream.slice() works streams', () => {
  expect(zero.slice(0, 1).toArray()).toEqual([0]);

  expect(zeroOne.slice(0, 1).toArray()).toEqual([0]);
  expect(zeroOne.slice(1, 2).toArray()).toEqual([1]);
  expect(zeroOne.slice(0, 2).toArray()).toEqual([0, 1]);

  expect(zeroToTen.slice(0, 0).toArray()).toEqual([]);
  expect(zeroToTen.slice(0, 1).toArray()).toEqual([0]);
  expect(zeroToTen.slice(1, 2).toArray()).toEqual([1]);
  expect(zeroToTen.slice(10, 11).toArray()).toEqual([10]);
  expect(zeroToTen.slice(1, 3).toArray()).toEqual([1, 2]);
  expect(zeroToTen.slice(0, 5).toArray()).toEqual([0, 1, 2, 3, 4]);
  expect(zeroToTen.slice(3, 8).toArray()).toEqual([3, 4, 5, 6, 7]);
  expect(zeroToTen.slice(6, 11).toArray()).toEqual([6, 7, 8, 9, 10]);
  expect(zeroToTen.slice(9, 15).toArray()).toEqual([9, 10]);
});

test('stream.slice() gives an array when an index is negative', () => {
  expect(empty.slice(-1, 0)).toEqual([]);
  expect(empty.slice(0, -1)).toEqual([]);

  expect(zero.slice(0, -1)).toEqual([]);
  expect(zero.slice(-1, 1)).toEqual([0]);

  expect(zeroOne.slice(-2, 2)).toEqual([0, 1]);
  expect(zeroOne.slice(0, -1)).toEqual([0]);
});
