/**
 * @file test/utils/arr.spec.js
 */
'use strict';

const test = require('ava');

const arr = require('../../src/utils/arr');

test('should be a function', (t) => {
  t.true(typeof arr === 'function');
});

test('should return an Array', (t) => {
  t.true(Array.isArray(arr(1)));
});

test('should return an Array of given length', (t) => {
  const myArr = arr(2);
  
  t.true(Array.isArray(myArr));
  t.true(myArr.length === 2);
});

test('should return an Array of given length filled with `undefined`', (t) => {
  const myArr = arr(3);
  
  t.true(Array.isArray(myArr));
  t.true(myArr.length === 3);
  
  myArr.forEach((each) => t.true(typeof each === 'undefined'));
});
