import { range } from '../src';

/* eslint-disable no-magic-numbers */

const empty = range(1, 0);
const zero = range(0, 0);
const oneToThree = range(1, 3);

test('emptyStream.forEach(fn) does *not* call fn', () => {
  const fn = jest.fn();

  empty.forEach(fn);
  expect(fn.mock.calls.length).toBe(0);
});

test('emptyStream.forEach(fn).consume() does *not* call fn', () => {
  const fn = jest.fn();

  empty.forEach(fn).consume();
  expect(fn.mock.calls.length).toBe(0);
});

test('range(0, 0).forEach(fn).consume() calls fn', () => {
  const fn = jest.fn();

  zero.forEach(fn).consume();
  expect(fn.mock.calls.length).toBe(1);
});

test('range(0, 0).forEach(fn).forEach(fn).consume() calls fn twice', () => {
  const fn = jest.fn();

  zero.forEach(fn).forEach(fn).consume();
  expect(fn.mock.calls.length).toBe(2);
});

test('range(1, 3).forEach(fn).consume() calls fn three times', () => {
  const fn = jest.fn();

  oneToThree.forEach(fn).consume();
  expect(fn.mock.calls.length).toBe(3);
});
