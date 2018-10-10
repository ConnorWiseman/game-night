/**
 * @file src/utils/product.js
 * @license MIT
 */
'use strict';

/**
 * Returns a reducing function for `Array.prototype.reduce` that computes the
 * limited Cartesian product of a given Array {b} with all the values in a
 * second Array using the function to reduce.
 * @param  {Array.<*>} b
 * @return {Array.<*>}
 * @private
 */
const product = (b) => (r, o) => [ ...r, ...b.map((i) => [ o, i ]) ];

/**
 * Computes the Cartesian product of two Arrays {a} and {b}.
 * @param  {Array.<*>} a
 * @param  {Array.<*>} [b=[]]
 * @return {Array<Array.<*>>}
 * @public
 */
module.exports = (a, b = []) => a.reduce(product(b), []);
