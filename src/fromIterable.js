import { expectIterable } from '@fpc/types';
import { getIterator } from './internals';
import { Stream } from './Stream';

/* eslint-disable no-sequences */
export const fromIterable = iterable => (
  expectIterable(iterable), new Stream(() => getIterator(iterable))
);
