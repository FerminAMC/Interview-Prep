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

/**
 * Iterate through the array once, storing the values in a dictionary, while at
 * the same time we look for the desired number, in this case the target. If
 * the target is in the dictionary, we return the current number of the array
 * and the one stored in the dictionary. If the pair of numbers is never found
 * an empty array is returned instead.
 * Complexity: O(n) time - O(n) space
 */
function twoNumberSum(array, targetSum) {
  const numbers = {}
  for (number of array) {
    const target = targetSum - number
    if (numbers[target]) {
      return [number, target]
    } else {
      numbers[number] = true
    }
  }
  return []
}

/**
 * This solution is not as efficient with time as the first version, but it is
 * more efficient with memory. When we sort the array we can use two pointers
 * i and j placed at the edges of the array. We move said pointers to the
 * center, depending on the sum of the numbers in array[i] and array[j]. If the
 * sum is greater than the targetSum, j moves to the left, otherwise, i moves
 * to the right. If the sum uf both numbers is equal to the targetSum, we
 * return an array with both numbers.
 *
 * array sorted = [-4, -1, 1, 3, 5, 6, 88, 11]
 * target sum = 10
 *
 * Complexity: O(n log(n)) time - O(1) space
 */
function twoNumberSum(array, targetSum) {
  array.sort((a, b) => a - b)
  let j = array.length - 1
  let i = 0
  while (i < j) {
    const currentSum = array[i] + array[j]
    if (currentSum == targetSum) {
      return [array[i], array[j]]
    }
    currentSum < targetSum ? i++ : j--
  }
  return []
}
