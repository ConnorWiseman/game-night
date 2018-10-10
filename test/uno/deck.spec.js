/**
 * @file test/uno/deck.spec.js
 */
'use strict';

const test = require('ava');

const deck = require('../../src/uno/deck');

const hasCardColor = (arr, color) => arr.reduce((result, each) =>
  result || each.color === color, false);

const hasCardValue = (arr, value) => arr.reduce((result, each) =>
  result || each.value === value, false);

const cardColorCount = (arr, color) => arr.reduce((result, each) => 
  result + Number(each.color === color), 0);
  
const cardValueCount = (arr, value) => arr.reduce((result, each) => 
  result + Number(each.value === value), 0);

const cardEffectCount = (arr, effect) => arr.reduce((result, each) =>
  result + Number(each.effects.includes(effect)), 0);

test('should be a function', (t) => {
  t.true(typeof deck === 'function');
});

test('should return an Array', (t) => {
  t.true(Array.isArray(deck()));
});

test('should return an Array of 108 elements without arguments', (t) => {
  t.true(Array.isArray(deck()));
  t.true(deck().length === 108);
});

test('should allow custom color sets', (t) => {
  const myDeck = deck({
    colors: [ 'orange', 'purple', 'indigo', 'brown', 'silver' ]
  });

  t.true(hasCardColor(myDeck, 'orange'));
  t.true(cardColorCount(myDeck, 'orange') === 25);
  t.true(hasCardColor(myDeck, 'purple'));
  t.true(cardColorCount(myDeck, 'purple') === 25);
  t.true(hasCardColor(myDeck, 'indigo'));
  t.true(cardColorCount(myDeck, 'indigo') === 25);
  t.true(hasCardColor(myDeck, 'brown'));
  t.true(cardColorCount(myDeck, 'brown') === 25);
  t.true(hasCardColor(myDeck, 'silver'));
  t.true(cardColorCount(myDeck, 'silver') === 25);
});

test('should allow custom zero counts', (t) => {
  const myDeck = deck({
    numZeroes: 0
  });

  t.false(hasCardValue(myDeck, 0));
  t.true(cardValueCount(myDeck, 0) === 0);
});

test('should allow custom amounts of number sets (1-9)', (t) => {
  const myDeck = deck({
    numNumberSets: 2
  });

  t.true(cardColorCount(myDeck, 'red') === 43);
  t.true(cardColorCount(myDeck, 'blue') === 43);
  t.true(cardColorCount(myDeck, 'green') === 43);
  t.true(cardColorCount(myDeck, 'yellow') === 43);
  t.true(cardValueCount(myDeck, 1) === 8);
  t.true(cardValueCount(myDeck, 2) === 8);
  t.true(cardValueCount(myDeck, 3) === 8);
  t.true(cardValueCount(myDeck, 4) === 8);
  t.true(cardValueCount(myDeck, 5) === 8);
  t.true(cardValueCount(myDeck, 6) === 8);
  t.true(cardValueCount(myDeck, 7) === 8);
  t.true(cardValueCount(myDeck, 8) === 8);
  t.true(cardValueCount(myDeck, 9) === 8);
});

test('should allow custom amounts of skip cards', (t) => {
  const myDeck = deck({
    numSkips: 0
  });

  t.true(cardEffectCount(myDeck, 'skip') === 0);
});

test('should allow custom amounts of reverse cards', (t) => {
  const myDeck = deck({
    numReverses: 0
  });

  t.true(cardEffectCount(myDeck, 'reverse') === 0);
});

test('should allow custom amounts of draw 2 cards', (t) => {
  const myDeck = deck({
    numDraw2s: 0
  });

  t.true(cardEffectCount(myDeck, 'draw2') === 0);
});

test('should allow custom amounts of wild cards', (t) => {
  const myDeck = deck({
    numWildCards: 0
  });

  // wild + draw 4 cards are still counted as "wild"
  t.true(cardEffectCount(myDeck, 'wild') === 4);
  t.true(cardEffectCount(myDeck, 'draw4') === 4);
});

test('should allow custom amounts of wild + draw 4 cards', (t) => {
  const myDeck = deck({
    numWildDraw4s: 0
  });

  // wild + draw 4 cards are still counted as "wild"
  t.true(cardEffectCount(myDeck, 'wild') === 4);
  t.true(cardEffectCount(myDeck, 'draw4') === 0);
});
