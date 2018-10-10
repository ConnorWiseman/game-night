/**
 * @file src/shared/shuffle.js
 */
'use strict';

const random = require('../random');

/**
 * Returns a copy of an Array {arr} with its values randomly shuffed. Uses the
 * specified random function {rand} to generate random values for shuffle
 * comparison.
 * @param  {Array.<*>} arr
 * @param  {Function}  [rand=random()]
 * @return {Array.<*>}
 * @public
 */
module.exports = (arr, rand = random()) => arr.map((each) => [ rand(), each ])
  .sort((a, b) => a[0] - b[0])
  .map(([ , each ]) => each);
