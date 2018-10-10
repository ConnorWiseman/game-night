/**
 * @file test/shared/roll.spec.js
 */
'use strict';

const sinon = require('sinon');
const test  = require('ava');

const roll = require('../../src/shared/roll');

test('should be a function', (t) => {
  t.true(typeof roll === 'function');
});

test('should return a Number', (t) => {
  t.true(typeof roll() === 'number');
});

test('should return an integer', (t) => {
  t.true(typeof roll() === 'number');
  t.true(Number.isInteger(roll()));
});
