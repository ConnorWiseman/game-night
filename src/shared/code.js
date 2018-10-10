/**
 * @file src/shared/code.js
 */
'use strict';

const arr    = require('../utils/arr');
const random = require('../random');

/**
 * Returns a mapping function for `Array.prototype.map` that maps an Array
 * index to the ASCII character at the specified offset, {o}. Defaults to 65,
 * 'A' in the ASCII table.
 * @param  {Number} o
 * @return {Function}
 * @private
 */
const toChar = (o = 65) => (_, i) => String.fromCharCode(i + o);

/**
 * Returns an Array containing the 26 characters of the uppercase Latin
 * alphabet. Used to provide a set of default values for the function `code()`.
 * @return {Array.<String>}
 * @private
 */
const chars = () => arr(26).map(toChar());

/**
 * Returns a mapping function for `Array.prototype.map` that maps an Array
 * index to a random String value from the specified source alphabet, {a}.
 * @param  {Array.<String>} a
 * @return {Function}
 * @private
 */
const rand = (a) => () => a[~~(random() * a.length)];

/**
 * Returns a String of length {l} randomly selected characters from a specified
 * alphabet, {a}. Used to generate room identifiers and join codes.
 * @param  {Number}         [l=4]
 * @param  {Array.<String>} [a=chars()]
 * @return {String}
 * @public
 */
module.exports = (l = 4, a = chars()) => arr(l).map(rand(a)).join('');
