/**
 * @file test/shared/code.spec.js
 */
'use strict';

const test = require('ava');

const code = require('../../src/shared/code');

test('should be a function', (t) => {
  t.true(typeof code === 'function');
});

test('should return a string', (t) => {
  t.true(typeof code() === 'string');
});

test('should return a string of specified length', (t) => {
  t.true(code(6).length === 6);
});

test('should return a string of specified length and contents', (t) => {
  t.true(code(6, [ 'A' ]).length === 6);
  t.true(code(6, [ 'A' ]) === 'AAAAAA');
});
