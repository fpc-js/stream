import { expectFunction, expectInteger } from '@fpc/types';
import { empty } from './internals';
import { consume } from './consume';
import { filterGenerator } from './filterGenerator';
import { forEachGenerator } from './forEachGenerator';
import { mapGenerator } from './mapGenerator';
import { reduce } from './reduce';
import { sliceGenerator } from './sliceGenerator';

/* global Symbol */

export class StreamGenerator {
  constructor (generator, ...args) {
    expectFunction(generator);

    this[Symbol.iterator] = args.length > 0
      ? () => generator(...args)
      : generator;
  }

  filter (fn) {
    return new StreamGenerator(filterGenerator, this, expectFunction(fn));
  }

  forEach (fn) {
    return new StreamGenerator(forEachGenerator, this, expectFunction(fn));
  }

  map (fn) {
    return new StreamGenerator(mapGenerator, this, expectFunction(fn));
  }

  reduce (fn, ...args) {
    const [initial] = args.length > 0 ? args : [empty];

    return reduce(this, expectFunction(fn), initial);
  }

  slice (begin = 0, end = Infinity) {
    expectInteger(begin);

    if (end !== Infinity) {
      expectInteger(end);
    }

    if (begin < 0 || end < 0) {
      throw new TypeError('Negative indexes cannot be used to slice streams');
    }

    return new StreamGenerator(sliceGenerator, this, begin, end);
  }

  consume () {
    return consume(this);
  }

  toArray () {
    return Array.from(this);
  }
}
