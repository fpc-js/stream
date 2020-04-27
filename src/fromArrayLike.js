import { expectObject, expectInteger } from '@fpc/types';
import { Stream } from './Stream';

/* eslint-disable-next-line func-style */
function *arrayLikeGenerator (obj) {
  for (let idx = 0, len = obj.length; idx < len; idx++) {
    yield obj[idx];
  }
}

const expectArrayLike = obj => {
  if (expectInteger(expectObject(obj).length) < 0) {
    throw new TypeError(`Expected non negative length, got ${obj.length}`);
  }

  return obj;
};

export const fromArrayLike = obj =>
  new Stream(arrayLikeGenerator, expectArrayLike(obj));
