import { fromIterable } from '../src';

/* eslint-disable no-magic-numbers */

test('fromIterable([]) is an empty stream', () =>
  expect(fromIterable([]).toArray()).toEqual([])
);

test('fromIterable([0]) = [0]', () =>
  expect(fromIterable([0]).toArray()).toEqual([0])
);

test('fromIterable([0, 1]) = [0, 1]', () =>
  expect(fromIterable([0, 1]).toArray()).toEqual([0, 1])
);

test('fromIterable([0, 1]).map(x => x + 1) = [1, 2]', () =>
  expect(fromIterable([0, 1]).map(x => x + 1).toArray()).toEqual([1, 2])
);
