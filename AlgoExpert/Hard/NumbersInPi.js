/**
 * Given a string representation of the first n digits of Pi and a list of
 * positive integers (all in string format), write a function that returns
 * the smallest number of spaces that can be added to the n digist of Pi such
 * that all resulting numbers are found in the list of integers.
 *
 * Note that a single number can appear multiple times in the resulting numbers.
 * For example, if Pi is "3141" and the numbers are ["1", "3", "4"], the
 * number "1" is allowed to appear twice in the list of resulting numbers after
 * three spaces are added:
 * "3 | 1 | 4 | 1".
 *
 * If no number of spaces to be added exists such that all resulting numbers
 * are found in the list of integers, the function should return -1.
 *
 * Input:
 * pi = "3141592653589793238462643383279"
 * numbers = ["314159265358979323846", "26433", "8", "3279", "314159265",
 * "35897932384626433832", "79"]
 *
 * Output: 2 => "314159265 | 35897932384626433832 | 79"
 */

/**
 * O(n^3) Time | O(n + m) Space - where n is the size of pi, and m is the size
 * of the cache we use in the recursive function getMinSpaces.
 * The reason this is n^3 and not n^2 is because of the slicing of the string.
 * In Javascript, that operation takes a time of O(n), adding that extra n to
 * the time complexity.
 */
function numbersInPi(pi, numbers) {
  const numbersTable = {}
  for (const number of numbers) {
    numbersTable[number] = true
  }
  const minSpaces = getMinSpaces(pi, numbersTable, {}, 0)
  return minSpaces === Infinity ? -1 : minSpaces
}

function getMinSpaces(pi, numbersTable, cache, idx) {
  if (idx === pi.length) return -1
  if (idx in cache) return cache[idx]
  let minSpaces = Infinity
  for (let i = idx; i < pi.length; i++) {
    const prefix = pi.slice(idx, i + 1)
    if (prefix in numbersTable) {
      const minSpacesInSuffix = getMinSpaces(pi, numbersTable, cache, i + 1)
      minSpaces = Math.min(minSpaces, minSpacesInSuffix + 1)
    }
  }
  cache[idx] = minSpaces
  return cache[idx]
}
