/* global Symbol */

export const getIterator = iterable =>
  iterable[Symbol.iterator]();
