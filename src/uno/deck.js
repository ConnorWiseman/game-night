/**
 * @file src/uno/deck.js
 */
'use strict';

const arr = require('../utils/arr');

/**
 * An Object representation of an Uno card.
 * @typedef {UnoCardObject}
 * @property {String}         color   - The color of the card.
 * @property {Number|null}    value   - The numerical value of the card.
 * @property {Array.<String>} effects - Any gameplay effects the card invokes.
 */

/**
 * Combines a {color}, {value}, and any number of {effects} into an Object
 * representation of an Uno card.
 * @param  {String}      color        - The color of the card.
 * @param  {Number|null} value        - The numerical value of the card.
 * @param  {...String}   [effects=[]] - Any gameplay effects the card invokes.
 * @return {UnoCardObject}
 * @private
 */
const card = (color, value, ...effects) => ({ color, value, effects });

/**
 * Returns an Array of length {n} of Uno cards in the specified {color} with a
 * value of zero. The standard Uno deck includes 1 zero card for each of the
 * four colors.
 * @param  {String} color - The color of the zero cards in the Array.
 * @param  {Number} n     - The number of zero cards in the Array.
 * @return {Array.<UnoCardObject>}
 * @private
 */
const zeroes = (color, n) => arr(n).map(() => card(color, 0));

/**
 * Returns a mapping function for `Array.prototype.map` that maps Array indices
 * to Uno cards in the specified {color}.
 * @param  {String} color - The color of the cards to map to.
 * @return {Function}
 * @private
 */
const cardNumberMap = (color) => (_, i) => card(color, ~~(i / 2) + 1);

/**
 * Returns an Array of length (18 * {n}) of Uno cards in the specified {color}
 * with values from one to nine. The standard Uno deck includes 2 of each
 * different number card for each of the four colors.
 * @param  {String} color - The color of the number cards in the Array.
 * @param  {Number} n     - The number of sets of number cards to generate.
 * @return {Array.<UnoCardObject>}
 * @private
 */
const numberSets = (color, n) => arr(n * 18).map(cardNumberMap(color));

/**
 * Returns a mapping function for `Array.prototype.map` that maps every value
 * in the Array to an Uno card in the specified {color} with any specified
 * {effects}. Used to generate Uno cards with special effects.
 * @param  {String}    color        - The color of the effect cards to map to.
 * @param  {...String} [effects=[]] - Any effects to include.
 * @return {Function}
 * @private
 */
const effectMap = (color, ...effects) => () => card(color, null, ...effects);

/**
 * Returns an Array of length {n} of Uno cards in the specified {color} that
 * skip the next player. The standard Uno deck includes 2 skip cards for each
 * of the four colors.
 * @param  {String} color - The color of the skip cards in the Array.
 * @param  {Number} n     - The number of skip cards to generate.
 * @return {Array.<UnoCardObject>}
 * @private
 */
const skips = (color, n) => arr(n).map(effectMap(color, 'skip'));

/**
 * Returns an Array of length {n} of Uno cards in the specified {color} that
 * reverse the turn order. The standard Uno deck includes 2 reverse cards for
 * each of the four colors.
 * @param  {String} color - The color of the reverse cards in the Array.
 * @param  {Number} n     - The number of reverse cards to generate.
 * @return {Array.<UnoCardObject>}
 * @private
 */
const reverses = (color, n) => arr(n).map(effectMap(color, 'reverse'));

/**
 * Returns an Array of length {n} of Uno cards in the specified {color} that
 * make the following player draw two cards. The standard Uno deck includes 2
 * "draw two" cards for each of the four colors.
 * @param  {String} color - The color of the "draw two" cards in the Array.
 * @param  {Number} n     - The number of "draw two" cards to generate.
 * @return {Array.<UnoCardObject>}
 * @private
 */
const draw2s = (color, n) => arr(n).map(effectMap(color, 'draw2'));

/**
 * Returns an Array of length {n} of Uno cards that let the current player
 * change the color. The standard Uno deck includes 4 wild cards.
 * @param  {Number} n - The number of wild cards to generate.
 * @return {Array.<UnoCardObject>}
 * @private
 */
const wilds = (n) => arr(n).map(effectMap('black', 'wild'));

/**
 * Returns an Array of length {n} of Uno cards that let the current player
 * change the color and make the following player draw four cards. The standard
 * Uno deck includes 4 "wild + draw 4" cards.
 * @param  {Number} n - The number of "wild + draw 4" cards to generate.
 * @return {Array.<UnoCardObject>}
 * @private
 */
const wildDraw4s = (n) => arr(n).map(effectMap('black', 'wild', 'draw4'));

/**
 * Returns an Array of the four standard Uno colors.
 * @return {Array.<String>}
 * @private
 */
const defaultColors = () => [ 'red', 'blue', 'green', 'yellow' ];

/**
 * Generates a complete deck of Uno cards. All standard Uno deck card counts
 * have been set as defaults, but any of them may be overridden for customized
 * deck and play styles. The standard Uno deck contains 108 cards total.
 * @param  {Object}         [opts={}]
 * @param  {Array.<String>} [opts.colors=defaultColors()]
 * @param  {Number}         [opts.numZeroes=1]
 * @param  {Number}         [opts.numNumberSets=1]
 * @param  {Number}         [opts.numSkips=2]
 * @param  {Number}         [opts.numReverses=2]
 * @param  {Number}         [opts.numDraw2s=2]
 * @param  {Number}         [opts.numWildCards=4]
 * @param  {Number}         [opts.numWildDraw4s=4}]
 * @return {Array.<UnoCardObject>}
 * @public
 */
module.exports = ({
  colors        = defaultColors(),
  numZeroes     = 1,
  numNumberSets = 1,
  numSkips      = 2,
  numReverses   = 2,
  numDraw2s     = 2,
  numWildCards  = 4,
  numWildDraw4s = 4
} = {}) => colors.map((color) => [
  ...zeroes(color, numZeroes),
  ...numberSets(color, numNumberSets),
  ...skips(color, numSkips),
  ...reverses(color, numReverses),
  ...draw2s(color, numDraw2s)
]).reduce((r, e) => [ ...r, ...e ], [
  ...wilds(numWildCards),
  ...wildDraw4s(numWildDraw4s)
]);
