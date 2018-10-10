/**
 * @file src/games/clue/deck.js
 * @license MIT
 */
'use strict';

/**
 * An Object representation of a Clue card.
 * @typedef {ClueCardObject}
 * @property {String} name - The name of the card.
 * @property {String} type - The type of card: `"room"|"suspect"|"weapon"`
 */

/**
 * Returns an Array of the nine standard Clue rooms.
 * @return {Array.<String>}
 * @private
 */
const defaultRooms = () => [
  'Kitchen',
  'Ballroom',
  'Conservatory',
  'Billiard Room',
  'Library',
  'Study',
  'Hall',
  'Lounge',
  'Dining Room'
];

/**
 * Returns an Array of the six standard Clue suspects.
 * @return {Array.<String>}
 * @private
 */
const defaultSuspects = () => [
  'Mrs. White',
  'Mr. Green',
  'Mrs. Peacock',
  'Professor Plum',
  'Miss Scarlet',
  'Colonel Mustard'
];

/**
 * Returns an Array of the nine standard Clue weapons.
 * @return {Array.<String>}
 * @private
 */
const defaultWeapons = () => [
  'Candlestick',
  'Knife',
  'Lead Pipe',
  'Revolver',
  'Rope',
  'Wrench'
];

/**
 * Combines a {name} and a {type} into an Object representation of a Clue card.
 * @param  {String} name - The name of the card.
 * @param  {String} type - The type of card.
 * @return {ClueCardObject}
 * @private
 */
const card = (name, type) => ({ name, type });

/**
 * Generates a complete deck of Clue cards using the standard deck of nine
 * rooms, six suspects, and six weapons, but any of the sets may be overridden
 * for customized deck and playstyles. The standard Clue deck contains 21 cards
 * total.
 * @param  {Object}         [opts={}]
 * @param  {Array.<String>} [opts.rooms=defaultRooms()]
 * @param  {Array.<String>} [opts.suspects=defaultSuspects()]
 * @param  {Array.<String>} [opts.weapons=defaultWeapons()]
 * @return {Array.<ClueCardObject>}
 * @public
 */
module.exports = ({
  rooms    = defaultRooms(),
  suspects = defaultSuspects(),
  weapons  = defaultWeapons()
} = {}) => [
  ...rooms.map   ((room)    => card(room,    'room')),
  ...suspects.map((suspect) => card(suspect, 'suspect')),
  ...weapons.map ((weapon)  => card(weapon,  'weapon'))
];
