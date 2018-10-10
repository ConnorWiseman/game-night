/**
 * @file test/random/prng.spec.js
 */
'use strict';

const test = require('ava');

const prng = require('../../src/random/prng');

test('should be a function', (t) => {
  t.true(typeof prng === 'function');
});

test('should return a function', (t) => {
  t.true(typeof prng() === 'function');
});

test('returned function should return a number >= 0 && < 1', (t) => {
  const rand = prng();
  
  for (let i = 0; i < 100000; i++) {
    const num = rand();
    t.true(typeof num === 'number');
    t.true(num >= 0 && num < 1);
  }
});
