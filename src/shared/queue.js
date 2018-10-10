/**
 * @file src/shared/queue.js
 */
'use strict';

/**
 * Returns an Array without its first {n} elements if the given Array {arr}'s
 * length exceeds {n}. Otherwise, returns a spread copy of the Array.
 * @param  {Number}    n   - The number of elements to discard.
 * @param  {Array.<*>} arr - The Array to return from.
 * @return {Array.<*>}
 * @private
 */
const limit = (n, arr) => (arr.length >= n)
  ? arr.slice(arr.length - n + 1)
  : [ ...arr ];

/**
 * A closure around a rotating queue with a maximum number of elements
 * {length} implemented as a simple Array. Returns an Object method collection
 * for interacting with the queue. Suitable for fewer, smaller elements with
 * frequent modification; not suitable for many, larger elements.
 * @param  {Number} [length=25] - The length to constrain the queue to.
 * @return {Object}
 * @public
 */
module.exports = (length = 25) => {

  /**
   * The underlying queue, implemented as an Array.
   * @type {Array.<*>}
   * @private
   */
  let _ = [];

  /**
   * A wrapper Object of methods for interacting with the queue.
   * @type {Object}
   * @namespace QueueWrapper
   */
  const wrapper = {

    /**
     * Returns a copy of the underlying queue made with the spread operator.
     * @return {Array.<*>}
     * @public
     */
    contents: () => [ ..._ ],

    /**
     * Empties the underlying queue by setting it to another empty Array.
     * Returns the wrapper Object.
     * @return {Object}
     * @public
     */
    empty: () => (_ = []) && wrapper,

    /**
     * Adds an element {el} to the end of the underlying queue. Similar to
     * `Array.prototype.push`, but constrains the overall size of the queue
     * such that it never exceeds the original specified length. Returns the
     * wrapper Object.
     * @param  {*} el - The element to add onto the queue.
     * @return {Object}
     * @public
     */
    push: (el) => (_ = [ ...limit(length, _), el ]) && wrapper
  };

  return wrapper;
};
