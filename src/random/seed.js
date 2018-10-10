/**
 * @file src/random/seed.js
 */
'use strict';

/**
 * Converts a call to `process.hrtime()` to nanoseconds. Suitable as a basic
 * seed value for noncryptographic pseudorandom number generators.
 * @param  {Array.<Number>} - The result of a call to `process.hrtime()`.
 * @return {Number}
 * @public
 */
module.exports = ([ s, n ] = process.hrtime()) => (s * 1e9) + n;
