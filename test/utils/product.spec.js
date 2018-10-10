/**
 * @file test/utils/product.spec.js
 */
'use strict';

const test = require('ava');

const product = require('../../src/utils/product');

test('should be a function', (t) => {
  t.true(typeof product === 'function');
});

test('should return an Array', (t) => {
  t.true(Array.isArray(product([])));
});

test('should return a Cartesian product', (t) => {
  const myProduct = product([ 1 ], [ 2, 3 ]);

  t.true(Array.isArray(myProduct[0]));
  t.true(myProduct[0][0] === 1);
  t.true(myProduct[0][1] === 2);
  t.true(Array.isArray(myProduct[1]));
  t.true(myProduct[1][0] === 1);
  t.true(myProduct[1][1] === 3);
});
