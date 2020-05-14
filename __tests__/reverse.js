import Stream from '../src';

/* eslint-disable no-magic-numbers */

const { range } = Stream;

test('<empty stream>.reverse() gives empty array', () =>
  expect(range(1, 0).reverse()).toEqual([])
);

test('stream.reverse() gives an array', () =>
  expect(range(1, 5).reverse()).toEqual([5, 4, 3, 2, 1])
);
