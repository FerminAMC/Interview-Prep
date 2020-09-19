/**
 * Write a function that takes in an array of positive integers and returns
 * the maximum sum of non-adjacent elements in the array.
 *
 * If a sum can't be generated, the function should return 0.
 */

/**
 * The trick for this problem is to create an extra array of the same size as
 * the normal array, that stores the max sums in every index up to that index.
 * This is clearer with an example.
 *
 * array =   [7, 10, 12,  7,  9, 14]
 * maxSums = [7, 10, 19, 19, 28, 33]
 *
 * If we take a closer look at the maxSums array, a formula for the max value in
 * the i-th position can be calculated. It is the following:
 * maxSums[i] = max(maxSums[i - 1], array[i] + maxSums[i - 2])
 *
 * With that formula, this problem can be solved in linear time.
 */

// O(n) Time - O(n) Space
function maxSubsetSumNoAdjacent(array) {
  if (array.length === 0) return 0
  let maxArray = new Array(array.length)
  maxArray[0] = array[0]
  maxArray[1] = Math.max(array[0], array[1])

  for (let i = 2; i < array.length; i++) {
    maxArray[i] = Math.max(maxArray[i - 1], array[i] + maxArray[i - 2])
  }
  return maxArray[array.length - 1]
}

/**
 * Once we have the formula from the previous version, we can optimize the code.
 * We don't really need to store an extra array, we are only interested in two
 * values, the previous and the previous of the previous, represented by prev
 * and prevPrev respectively.
 */
// O(n) Time - O(1) Space
function maxSubsetSumNoAdjacent(array) {
  if (array.length === 0) return 0
  if (array.length === 1) return array[0]

  let prevPrev = array[0]
  let prev = Math.max(prevPrev, array[1])
  let max = prev
  for (let i = 2; i < array.length; i++) {
    max = Math.max(prev, prevPrev + array[i])
    prevPrev = prev
    prev = max
  }
  return max
}
