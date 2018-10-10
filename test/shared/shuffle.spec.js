/**
 * @file test/shared/shuffle.spec.js
 */
'use strict';

const sinon = require('sinon');
const test  = require('ava');

const shuffle = require('../../src/shared/shuffle');

test('should be a function', (t) => {
  t.true(typeof shuffle === 'function');
});

test('should return an Array', (t) => {
  t.true(Array.isArray(shuffle([])));
});

test('should shuffle Array values', (t) => {
  const rand = sinon.stub()
    .onFirstCall().returns(0.5)
    .onSecondCall().returns(0);
  
  const shuffled = shuffle([ 1, 2 ], rand);
  
  t.true(shuffled[0] === 2);
  t.true(shuffled[1] === 1);
});

test('should shuffle Array values without modifying original Array', (t) => {
  const rand = sinon.stub()
    .onFirstCall().returns(0.5)
    .onSecondCall().returns(0);
  
  const initial  = [ 1, 2 ];
  const shuffled = shuffle(initial, rand);
  
  t.true(initial[0]  === 1);
  t.true(initial[1]  === 2);
  t.true(shuffled[0] === 2);
  t.true(shuffled[1] === 1);
});
