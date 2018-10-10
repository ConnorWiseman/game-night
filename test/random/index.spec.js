/**
 * @file test/random/index.spec.js
 */
'use strict';

const test = require('ava');

const random = require('../../src/random');

test('should be a function', (t) => {
  t.true(typeof random === 'function');
});
