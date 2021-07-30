import { expectIterable } from '@fpc/types';
import { StreamGenerator } from './internals/StreamGenerator.js';

/* global Symbol */

/* eslint-disable no-sequences */
export const fromIterable = iterable => (
  expectIterable(iterable),
  new StreamGenerator(() => iterable[Symbol.iterator]())
);
