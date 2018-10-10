/**
 * @file src/utils/arr.js
 * @license MIT
 */
'use strict';

/**
 * Returns an Array of length {l} filled with undefined values, suitable for
 * iterating over with `Array.prototype.map`.
 * @param  {Number} length - The length of the Array to create.
 * @return {Array.<undefined>}
 * @public
 */
module.exports = (length) => new Array(length).fill();
