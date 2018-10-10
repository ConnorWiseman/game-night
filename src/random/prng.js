/**
 * @file src/random/prng.js
 * @see {@link http://www.burtleburtle.net/bob/rand/smallprng.html}
 * @license
 * Original Work Copyright (c) 2007-2018 Bob Jenkins
 * Modified work Copyright (c) 2018      Connor Wiseman
 *
 * This is free and unencumbered software released into the public domain.
 *
 * Anyone is free to copy, modify, publish, use, compile, sell, or
 * distribute this software, either in source code form or as a compiled
 * binary, for any purpose, commercial or non-commercial, and by any
 * means.
 *
 * In jurisdictions that recognize copyright laws, the author or authors
 * of this software dedicate any and all copyright interest in the
 * software to the public domain. We make this dedication for the benefit
 * of the public at large and to the detriment of our heirs and
 * successors. We intend this dedication to be an overt act of
 * relinquishment in perpetuity of all present and future rights to this
 * software under copyright law.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * For more information, please refer to <http://unlicense.org/>
 */
'use strict';

const seed = require('./seed');

/**
 * Performs a bitwise left circular shift on {x}.
 * @param  {Number} x
 * @param  {Number} k
 * @return {Number}
 * @private
 */
const rot = (x, k) => (x << k) | (x >> (32 - k));

/**
 * Performs bitwise shuffling on the values in a given context Array to produce
 * a pseudorandom value.
 * @param  {Array.<Number>} ctx
 * @return {Number}
 * @private
 */
const next = (ctx) => {
  const e = (ctx[0] - rot(ctx[1], 27)) >>> 0;

  ctx[0] = (ctx[1] ^ rot(ctx[2], 17))  >>> 0;
  ctx[1] = (ctx[2] + ctx[3])           >>> 0;
  ctx[2] = (ctx[3] + e)                >>> 0;
  ctx[3] = (e      + ctx[0])           >>> 0;

  return ctx[3] / 4294967296.0;
};

/**
 * Given an initial seed value {s} and a number of cycles to initially run {i},
 * returns a function that generates noncryptographically-strong pseudorandom
 * floating point numbers in the interval [0, 1). The returned function is
 * intended as a drop-in, seedable replacement for JavaScript's `Math.random()`
 * function.
 * @param  {Number} [s=seed()]
 * @param  {Number} [i=20]
 * @return {Function}
 * @public
 */
module.exports = (s = seed(), i = 20) => {
  const ctx = [ 0xf1ea5eed, s, s, s ];

  return new Array(i)
    .fill()
    .map(() => next(ctx))
    .reduce((result) => result, () => next(ctx));
};
