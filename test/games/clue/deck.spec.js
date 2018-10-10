/**
 * @file test/games/clue/deck.spec.js
 */
'use strict';

const test = require('ava');

const deck = require('../../../src/games/clue/deck');

const cardTypeCount = (arr, type) => arr.reduce((result, each) => 
  result + Number(each.type === type), 0);

test('should be a function', (t) => {
  t.true(typeof deck === 'function');
});

test('should return an Array', (t) => {
  t.true(Array.isArray(deck()));
});

test('should return an Array of 21 elements without arguments', (t) => {
  t.true(Array.isArray(deck()));
  t.true(deck().length === 21);
});

test('should allow custom room sets', (t) => {
  const myDeck = deck({
    rooms: [ 'Basement', 'Attic', 'Veranda', 'Bathroom' ]
  });
  
  t.true(cardTypeCount(myDeck, 'room') === 4);
});

test('should allow custom suspect sets', (t) => {
  const myDeck = deck({
    suspects: [ 'Dr. Dandelion', 'Inspector Indigo', 'Viscountess Victoire' ]
  });
  
  t.true(cardTypeCount(myDeck, 'suspect') === 3);
});

test('should allow custom weapon sets', (t) => {
  const myDeck = deck({
    weapons: [
      'Drums', 'Pipes', 'Lords', 'Ladies', 'Maids', 'Swans', 'Geese',
      'Gold Rings', 'Calling Birts', 'French Hens', 'Turtle Doves',
      'Partridge in a Pear Tree'
    ]
  });
  
  t.true(cardTypeCount(myDeck, 'weapon') === 12);
});
