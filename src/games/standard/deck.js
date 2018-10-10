/**
 * @file src/games/standard/deck.js
 * @license MIT
 */
'use strict';

const arr     = require('../../utils/arr');
const product = require('../../utils/product');

/**
 * An Object representation of a traditional playing card.
 * @typedef {PlayingCardObject}
 * @property {String}      type  - The type of the card.
 * @property {String|null} suit  - The card's suit. `null` if card is a Joker.
 * @property {Number|null} value - The card's value. `null` if card is a Joker.
 */

/**
 * An Array of the four traditional playing card suits.
 * @type {Array.<String>}
 * @private
 */
const defaultSuits = [ 'clubs', 'diamonds', 'hearts', 'spades' ];

/**
 * An Array of the thirteen traditional playing card types.
 * @type {Array.<String>}
 * @private
 */
const defaultTypes = [
  'ace', 'two', 'three', 'four', 'five', 'six', 'seven',
  'eight', 'nine', 'ten', 'jack', 'queen', 'king'
];

/**
 * Combines a {type}, {suit}, and {value} into an Object representation of a
 * traditional playing card.
 * @param  {String}      type         - The type of the card.
 * @param  {String|null} [suit=null]  - The card's suit.
 * @param  {Number|null} [value=null] - The card's value.
 * @return {PlayingCardObject}
 * @private
 */
const card = (type, suit = null, value = null) => ({ type, suit, value });

/**
 * A mapping function for `Array.prototype.map` that maps the result of a
 * Cartesian product between card types and card suits, along with a given
 * Array index, to Object representations of a traditional playing card.
 * @param  {Array.<String>} arr
 * @param  {Number}         i
 * @return {PlayingCardObject}
 * @private
 * @todo JSDoc documentation for destructured array parameters?
 */
const cardMap = ([ t, s ], i) => card(t, s, ((i / 4) | 0) % 13 + 1);

/**
 * Returns an Array of Joker cards.
 * @param  {Number} n - The number of Jokers to include.
 * @return {Array.<PlayingCardObject>}
 * @private
 */
const jokers = (n) => arr(n).map(() => card('joker'));

/**
 * Generates a complete deck of 54 traditional playing cards- the 52 suit cards
 * and 2 Jokers. However, the number of Jokers may be overridden for custom
 * decks and play styles..
 * @param  {Object} [opts={}]
 * @param  {Number} [opts.numJokers=2]
 * @return {Array.<PlayingCardObject>}
 * @public
 */
module.exports = ({
  numJokers = 2
} = {}) => [
  ...product(defaultSuits, defaultTypes).map(cardMap),
  ...jokers(numJokers)
];
