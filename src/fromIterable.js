import { expectIterable } from '@fpc/types';
import { getIterator } from './internals/getIterator';
import { StreamGenerator } from './internals/StreamGenerator';

/* eslint-disable no-sequences */
export const fromIterable = iterable => (
  expectIterable(iterable), new StreamGenerator(() => getIterator(iterable))
);
