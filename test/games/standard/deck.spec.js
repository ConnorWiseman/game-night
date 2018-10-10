/**
 * @file test/games/standard/deck.spec.js
 */
'use strict';

const test = require('ava');

const deck = require('../../../src/games/standard/deck');

const hasCardType = (arr, type) => arr.reduce((result, each) =>
  result || each.type === type, false);

const cardTypeCount = (arr, type) => arr.reduce((result, each) => 
  result + Number(each.type === type), 0);

test('should be a function', (t) => {
  t.true(typeof deck === 'function');
});

test('should return an Array', (t) => {
  t.true(Array.isArray(deck()));
});

test('should return an Array of 54 elements without arguments', (t) => {
  t.true(Array.isArray(deck()));
  t.true(deck().length === 54);
});

test('should allow custom Joker counts', (t) => {
  const myDeck = deck({
    numJokers: 0
  });

  t.true(myDeck.length === 52);
  t.false(hasCardType(myDeck, 'joker'));
  t.true(cardTypeCount(myDeck, 'joker') === 0);
});
