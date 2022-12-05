# @fpc/stream

<div align="center">
  <a href="https://drone.tno.sh/fpc-js/stream" target="_blank">
    <img src="https://drone.tno.sh/api/badges/fpc-js/stream/status.svg?branch=master" alt="Build Status">
  </a>
  <a href="https://snyk.io/test/github/fpc-js/stream?targetFile=package.json">
    <img src="https://snyk.io/test/github/fpc-js/stream/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/fpc-js/stream?targetFile=package.json" style="max-width:100%;">
  </a>
  <a href="https://codecov.io/gh/fpc-js/stream" target="_blank">
    <img src="https://codecov.io/gh/fpc-js/stream/branch/master/graph/badge.svg?token=5Q6WS0A3VX" alt="Coverage Status">
  </a>
  <a href="https://github.com/semantic-release/semantic-release" target="_blank">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release">
  </a>
</div>

Synchronous streams are a powerful way to process collections efficiently.
They are build on top of javascript [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
to leverage their performance and simplify utilization.
The interface follows the native [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) interface, but it's not exactly the same.

## Create streams

### fromArrayLike

Converts an array-like object in a `Stream`.
The object must have a non-negative integer property named `length`.

```javascript
import Stream from '@fpc/stream';

const obj = { 0: 'first', 1: 'second', 2: 'third', length: 3 };
const strm = Stream.fromArrayLike(obj);
strm.toArray(); // [ 'first', 'second', 'third' ]
```

Note that `fromArrayLike` is `O(1)`: when the stream is created the given object
is *not* iterated over.

```javascript
const range = new Proxy({ length: 4 }, {
  get: (target, prop) => {
    const idx = +String(prop);

    if (isNaN(idx)) {
      return target[prop];
    }

    if (idx < 0 || idx >= 3) {
      throw new Error('Index out of bounds');
    }

    return idx;
  }
});

Array.from(range); // Error: Index out of bounds

const strm = Stream.fromArrayLike(range); // nothing happens
strm.toArray(); // Error: Index out of bounds
strm.slice(0, 2).toArray(); // [ 0, 1 ]
```

### fromIterable

Takes an object that implements the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol) and creates a `Stream`. Doesn't iterate over given object.

```javascript
import Stream from '@fpc/stream';

Stream.fromIterable([ 1, 2, 3 ]).toArray(); // [ 1, 2, 3 ]

const rangeIterable = {
  *[Symbol.iterator]() {
    for (let i = 0; i < 3; i++) {
      yield i;
    }
  }
};

Stream.fromIterable(rangeIterable).toArray(); // [ 0, 1, 2 ]
```

### iterate

Creates an infinite stream produced by iterative application of a function.

```javascript
import Stream from '@fpc/stream';

// Note `acc` is `undefined` during the first iteration
Stream.iterate(acc => (acc || 0) + 1).slice(0, 3).toArray(); // [ 1, 2, 3 ]
```

The second argument can be passed to initialize the accumulator.
It will also be put into the stream.

```javascript
Stream.iterate(acc => acc + 1, 0).slice(0, 3).toArray(); // [ 0, 1, 2 ]

const fibonacciSequence = Stream
  .iterate(([fst, snd]) => [snd, fst + snd], [0, 1])
  .map(([fst]) => fst);

fibonacciSequence.slice(0, 8).toArray(); // [ 0, 1, 1, 2, 3, 5, 8, 13 ]
```

A zero-based index is passed to the function at every iteration and the iterations
are stopped if the function returns `null` or `undefined`.

```javascript
Stream.iterate((acc, idx) => acc + idx, 0).slice(1, 6).toArray()); // [ 0, 1, 3, 6, 10 ]
Stream.iterate((_, i) => (i < 3 ? i : null)).toArray(); // [0, 1, 2]
```

### range

`range(start, end)` returns the closed interval that includes all integers
from `start` to `end` including the limits as a stream.

```javascript
import Stream from '@fpc/stream';

Stream.range(0, 1).toArray(); // [ 0, 1 ]
```

If the second argument is omitted `+Infinity` is assumed as upper bound.
The third argument can be used to customize the `step`.

```javascript
Stream.range(0); // we really don't want to call toArray on an infinite stream
Stream.range(0, 4, 0.9).toArray(); // [ 0, 0.9, 1.8, 2.7, 3.6 ]
```

## Stream API

### Stream.prototype.consume

Iterates over the entire stream.

⚠ Be careful: do not consume infinite streams ⚠

### Stream.prototype.filter

Takes a function that performs a test on the elements and returns a new stream
that contains only the elements that pass the test.

```javascript
import Stream from '@fpc/stream';

const oneToTen = Stream.range(1, 10);
const justEven = oneToTen.filter(n => n % 2 === 0);
justEven.toArray(); // [ 2, 4, 6, 8, 10 ]
```

Note that `filter` is lazy, before the `toArray` call nothing is actually filtered.

Cf. [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

### Stream.prototype.slice

`stream.slice(begin, end)` creates a new stream that contains all the elements
of `stream` between the indexes `begin` and `end` (not including `end`).

By default `begin` is `0` and `end` is `Infinity`.

```javascript
import Stream from '@fpc/stream';

const oneToTen = Stream.range(1, 10);
const nineToTen = oneToTen.slice(8);
nineToTen.toArray(); // [ 9, 10 ]
```

The slice is lazy and it's performed when the stream is consumed.

Cf. [Array.prototype.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

### Stream.prototype.forEach

Executes a function once for each element in the stream.

```javascript
import Stream from '@fpc/stream';

let strm = Stream.range(0, 3);
strm = strm.forEach(n => console.log(n)); // nothing is logged
strm.consume(); // logs 0, 1, 2, 3
```

N.b.: Unlike [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
this method is lazy and returns the stream itself, not `undefined`.

Until the stream is consumed nothing is performed, so `stream.forEach(console.log)`
doesn't log anything before `consume`, `reduce`, `toArray` or something else
actually iterates through the stream.

### Stream.prototype.map

Works like [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), but it's lazy evaluated.

### Stream.prototype.reduce

Cf. [Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

```javascript
import Stream from '@fpc/stream';

// yay! triangular number https://en.wikipedia.org/wiki/Triangular_number
Stream.range(1, 100).reduce((acc, n) => n + acc, 0) === 100 * 101 / 2;
```

### Stream.prototype.toArray

Shortcut for `Array.from(stream)`, consumes the entire stream and returns
a javascript array.

### [Symbol.iterator]

Streams implement the [iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol),
so they can be used with [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
syntax, [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_array_literals),
[yield*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/yield*),
[array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring),
etc...

```javascript
import Stream from '@fpc/stream';

const strm = Stream.range(0, 3);

console.log(Array.from(strm)); // [ 0, 1, 2, 3 ]
console.log([ ...strm, 4 ]); // [ 0, 1, 2, 3, 4 ]

for (const n of strm) {
  console.log(n);
}

const [fst, snd, ...rest] = strm;
console.log(fst); // 0
console.log(snd); // 1
console.log(rest); // [ 2, 3 ]
```
