/**
 * @file test/shared/queue.spec.js
 */
'use strict';

const test = require('ava');

const queue = require('../../src/shared/queue');

test('should be a function', (t) => {
  t.true(typeof queue === 'function');
});

test('should return an Object', (t) => {
  t.true(typeof queue() === 'object');
});

test('returned Object should have `contents()`, `empty()`, `push()` methods', (t) => {
  const obj = queue();
  
  [ 'contents', 'empty', 'push' ].forEach((method) => {
    t.true(Object.prototype.hasOwnProperty.call(obj, method));
    t.true(typeof obj[method] === 'function');
  });
});

test('`contents()` should return an Array', (t) => {
  const obj = queue();
  
  t.true(Array.isArray(obj.contents()));
});

test('`empty()` should return wrapper Object', (t) => {
  const obj = queue();
  
  t.true(obj.empty() === obj);
});

test('`empty()` should empty underlying queue', (t) => {
  const obj = queue();
  
  t.true(obj.contents().length === 0);
  t.true(obj.push(null) === obj);
  t.true(obj.push(null) === obj);
  t.true(obj.push(null) === obj);
  t.true(obj.contents().length === 3);
  t.true(obj.empty() === obj);
  t.true(obj.contents().length === 0);
});

test('`push()` should return wrapper Object', (t) => {
  const obj = queue();
  
  t.true(obj.push(null) === obj);
});

test('`push()` should push element onto underlying queue', (t) => {
  const obj = queue();
  
  t.true(obj.contents().length === 0);
  t.true(obj.push(null) === obj);
  t.true(obj.contents().length === 1);
});

test('`push()` should never fill underlying queue past capacity', (t) => {
  const obj = queue(5);
  
  t.true(obj.contents().length === 0);
  t.true(obj.push(1) === obj);
  t.true(obj.contents().length === 1);
  t.true(obj.push(2) === obj);
  t.true(obj.contents().length === 2);
  t.true(obj.push(3) === obj);
  t.true(obj.contents().length === 3);
  t.true(obj.push(4) === obj);
  t.true(obj.contents().length === 4);
  t.true(obj.push(5) === obj);
  t.true(obj.contents().length === 5);
  t.true(obj.push(6) === obj);
  t.true(obj.contents().length === 5);
  t.true(obj.push(7) === obj);
  t.true(obj.contents().length === 5);
  t.true(obj.push(8) === obj);
  t.true(obj.contents().length === 5);
  t.true(obj.push(9) === obj);
  t.true(obj.contents().length === 5);
  t.true(obj.push(10) === obj);
  t.true(obj.contents().length === 5);
  t.true(obj.contents()[0] === 6);
  t.true(obj.contents()[1] === 7);
  t.true(obj.contents()[2] === 8);
  t.true(obj.contents()[3] === 9);
  t.true(obj.contents()[4] === 10);
});
