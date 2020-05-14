import { expectIterable } from '@fpc/types';
import { getIterator } from './internals';
import { StreamGenerator } from './StreamGenerator';

/* eslint-disable no-sequences */
export const fromIterable = iterable => (
  expectIterable(iterable), new StreamGenerator(() => getIterator(iterable))
);
