/**
 * @file src/shared/shuffle.js
 */
'use strict';

const random = require('../random');

/**
 * [exports description]
 * @param  {Array.<*>} arr
 * @param  {Function}  [rand=random()]
 * @return {Array.<*>}
 * @public
 */
module.exports = (arr, rand = random()) => arr.map((each) => [ rand(), each ])
  .sort((a, b) => a[0] - b[0])
  .map(([ , each ]) => each);
