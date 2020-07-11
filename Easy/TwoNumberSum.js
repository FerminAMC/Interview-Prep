/**
 * Function that takes in a non-empty array of unique numbers and an integer
 * that represents the target sum. If two numbers in the array sum up to that
 * target, the function must return an array with those two values, otherwise,
 * it should return an empty array.
 *
 * The target sum must be the sum of two different numbers in the array. It is
 * possible to assume that there is at most only one pair of numbers that sum
 * up to the target sum. The order of the output numbers doesn't matter
 *
 * array: [4, 6, 1, -3]
 * targetSum: 3
 * output: [6, -3]
 */

// Complexity: O(n) time - O(n) space
function twoNumberSum(array, targetSum) {
  const numbers = {}
  for (number of array) {
    target = targetSum - number
    if (numbers[target]) {
      return [number, target]
    } else {
      numbers[number] = true
    }
  }
  return []
}
