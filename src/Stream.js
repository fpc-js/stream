import { expectFunction, expectInteger } from '@fpc/types';
import { empty } from './internals';
import { filterGenerator } from './filterGenerator';
import { forEachGenerator } from './forEachGenerator';
import { mapGenerator } from './mapGenerator';
import { reduce } from './reduce';
import { sliceGenerator } from './sliceGenerator';

/* global Symbol */

class Ctor {
  constructor (generator, ...args) {
    expectFunction(generator);

    this[Symbol.iterator] = args.length > 0
      ? () => generator(...args)
      : generator;
  }

  filter (fn) {
    return new Ctor(filterGenerator, this, expectFunction(fn));
  }

  forEach (fn) {
    return new Ctor(forEachGenerator, this, expectFunction(fn));
  }

  map (fn) {
    return new Ctor(mapGenerator, this, expectFunction(fn));
  }

  reduce (fn, ...args) {
    const [initial] = args.length > 0 ? args : [empty];

    return reduce(this, expectFunction(fn), initial);
  }

  reverse () {
    return this.toArray().reverse();
  }

  slice (begin = 0, end = Infinity) {
    expectInteger(begin);

    if (end !== Infinity) {
      expectInteger(end);
    }

    if (begin < 0 || end < 0) {
      return this.toArray().slice(begin, end);
    }

    return new Ctor(sliceGenerator, this, begin, end);
  }

  toArray () {
    return Array.from(this);
  }
}

export const Stream = generator => new Ctor(generator);

Stream.prototype = Ctor.prototype;
