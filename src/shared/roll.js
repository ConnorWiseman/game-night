/**
 * @file src/shared/roll.js
 */
'use strict';

const random = require('../random');

/**
 * Given a lower limit {min}, an upper limit {max}, and a function to generate
 * random values {rand}, returns an integer in the interval [min, max].
 * @param  {Number}   [min=6]
 * @param  {Number}   [max=6]
 * @param  {Function} [rand=random]
 * @return {Number}
 * @public
 */
module.exports = (min = 1, max = 6, rand = random) =>
  (rand() * (max - min + 1)) + min | 0;
