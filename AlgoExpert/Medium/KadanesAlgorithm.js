/**
 * Write a function that takes in a non-empty array of integers and returns the
 * maximum sum that can be obtained by summing up all of the integers in a
 * non-empty subarray of the input array. A subarray must only contain adjacent
 * numbers.
 *
 * Input:
 * array =  = [3, 5, -9, 1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1, -5, 4]
 * result = 19 => [1, 3, -2, 3, 4, 7, 2, -9, 6, 3, 1]
 */

/**
 * O(n) Time | O(1) Space - where n is the number of elements in the array.
 */
function kadanesAlgorithm(array) {
  let currentSum = 0
  let max = -Infinity
  for (let i = 0; i < array.length; i++) {
    const currentNum = array[i]
    currentSum += currentNum
    if (currentNum > currentSum) {
      currentSum = currentNum
    }
    max = Math.max(max, currentSum)
  }
  return max
}
