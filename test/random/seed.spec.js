/**
 * @file test/random/seed.spec.js
 */
'use strict';

const test = require('ava');

const seed = require('../../src/random/seed');

test('should return a number', (t) => {
  t.true(typeof seed() === 'number');
});
