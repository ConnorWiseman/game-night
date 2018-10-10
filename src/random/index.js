/**
 * @file src/random/index.js
 * @license MIT
 */
'use strict';

const prng = require('./prng');

/**
 * A drop-in replacement for JavaScript's built-in `Math.random()`.
 * @type {Function}
 * @public
 */
module.exports = prng();
